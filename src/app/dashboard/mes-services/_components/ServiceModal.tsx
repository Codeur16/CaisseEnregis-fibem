'use client';

import { useState, useEffect } from 'react';
import { useServiceStore } from '@/stores/serviceStore';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { fetchServiceCategories } from '@/actions/services';
import { createService, updateService } from '@/actions/services';

export default function ServiceModal() {
  const { isOpen, onClose, service } = useServiceStore();
  const { data: session } = useSession();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    base_price: 0,
    category: 0,
    image: null as File | null,
  });

  // Initialize form when modal opens or service changes
  useEffect(() => {
    if (isOpen) {
      loadCategories();

      // If editing a service, populate the form
      if (service) {
        setFormData({
          name: service.name || '',
          description: service.description || '',
          base_price: service.base_price || 0,
          category: service.category || 0,
          image: null, // We don't set the existing image file, just show preview
        });
      } else {
        // Reset form for new service
        setFormData({
          name: '',
          description: '',
          base_price: 0,
          category: 0,
          image: null,
        });
      }
    }
  }, [isOpen, service]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await fetchServiceCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Failed to load service categories');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'base_price') {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: Number(value)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.accessToken) {
      toast.error('You must be logged in to manage services');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('base_price', formData.base_price.toString());
      formDataToSend.append('category', formData.category.toString());

      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (service) {
        // Update existing service
        await updateService({ id: service.id, data: formDataToSend, token: session.accessToken });
        toast.success('Service updated successfully');
      } else {
        // Create new service
        await createService({ data: formDataToSend, token: session.accessToken });
        toast.success('Service created successfully');
      }

      onClose(); // Close the modal
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error(service ? 'Failed to update service' : 'Failed to create service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  // Determine if we're in edit mode
  const isEditMode = !!service;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Service' : 'Create New Service'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Name Field */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Service Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter service name"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter service description"
                rows={4}
              />
            </div>

            {/* Base Price Field */}
            <div className="space-y-2">
              <Label htmlFor="base_price">Base Price *</Label>
              <Input
                id="base_price"
                name="base_price"
                type="number"
                min="0"
                step="0.01"
                value={formData.base_price}
                onChange={handleChange}
                required
                placeholder="0.00"
              />
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              {loading ? (
                <div className="flex items-center justify-center h-10">
                  <Spinner />
                </div>
              ) : (
                <Select
                  value={formData.category.toString()}
                  onValueChange={handleSelectChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Image Upload Field */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {formData.image && (
                <Card className="mt-2">
                  <CardContent className="p-2">
                    <p className="text-sm text-muted-foreground">Selected file: {formData.image.name}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Image Preview if editing */}
            {isEditMode && service?.image && !formData.image && (
              <div className="col-span-2">
                <Label>Current Image</Label>
                <div className="mt-2">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="max-w-full h-40 object-contain rounded-md border"
                  />
                </div>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2" />
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditMode ? 'Update Service' : 'Create Service'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}