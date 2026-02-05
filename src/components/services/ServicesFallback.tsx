'use client'

import { motion } from 'framer-motion'
import { useScopedI18n } from '@/locales/client'
import {
    FileText,
    DollarSign,
    Download,
    Users,
    ClipboardList,
    Clock,
    Receipt,
    FileCheck,
    Building2,
    ExternalLink,
    Briefcase,
    TrendingUp,
    Shield
} from 'lucide-react'
import Link from 'next/link'

export default function ServicesFallback() {
    const t = useScopedI18n('services.fallback')

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring' as any, stiffness: 100 }
        }
    }

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-fibem-dark to-slate-800 text-white py-20 px-4 rounded-2xl mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
                    >
                        {t('hero.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100 leading-relaxed"
                    >
                        {t('hero.subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Section 1: Accompagnement Stratégique */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-fibem-primary mb-8 flex items-center gap-3">
                    <Briefcase className="w-8 h-8" />
                    {t('strategic.title')}
                </h2>
                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-md border border-fibem-light hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                            <FileText className="w-8 h-8 text-fibem-secondary" />
                        </div>
                        <h3 className="text-2xl font-bold text-fibem-dark mb-4">{t('strategic.prestations.title')}</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {t('strategic.prestations.description')}
                        </p>
                        <Link
                            href="/services/prestations"
                            className="inline-flex items-center gap-2 text-fibem-primary font-bold hover:text-fibem-secondary transition-colors"
                        >
                            {t('strategic.learnMore')}
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-md border border-fibem-light hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                            <DollarSign className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-fibem-dark mb-4">{t('strategic.tarifs.title')}</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {t('strategic.tarifs.description')}
                        </p>
                        <Link
                            href="/services/tarifs"
                            className="inline-flex items-center gap-2 text-fibem-primary font-bold hover:text-fibem-secondary transition-colors"
                        >
                            {t('strategic.viewPricing')}
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-md border border-fibem-light hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                            <Download className="w-8 h-8 text-fibem-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-fibem-dark mb-4">{t('strategic.brochure.title')}</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {t('strategic.brochure.description')}
                        </p>
                        <Link href="/services/plaquette" className="inline-flex items-center gap-2 px-6 py-3 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transition-colors shadow-md">
                            <Download className="w-5 h-5" />
                            {t('strategic.downloadBrochure')}
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Section 2: Gestion du Capital Humain */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-fibem-primary mb-8 flex items-center gap-3">
                    <Users className="w-8 h-8" />
                    {t('humanCapital.title')}
                </h2>
                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 shadow-md border border-purple-100 hover:shadow-xl transition-shadow">
                        <Link href="/services/formulaire-cv" className="block">
                            <ClipboardList className="w-12 h-12 text-purple-600 mb-4" />
                            <h3 className="text-xl font-bold text-fibem-dark mb-3">{t('humanCapital.cvForm.title')}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t('humanCapital.cvForm.description')}
                            </p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-md border border-blue-100 hover:shadow-xl transition-shadow">
                        <Link href="/services/fiche-candidat" className="block">
                            <FileCheck className="w-12 h-12 text-fibem-secondary mb-4" />
                            <h3 className="text-xl font-bold text-fibem-dark mb-3">{t('humanCapital.candidateSheet.title')}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t('humanCapital.candidateSheet.description')}
                            </p>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-md border border-green-100 hover:shadow-xl transition-shadow">
                        <Link href="/services/feuille-heures" className="block">
                            <Clock className="w-12 h-12 text-green-600 mb-4" />
                            <h3 className="text-xl font-bold text-fibem-dark mb-3">{t('humanCapital.timesheet.title')}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t('humanCapital.timesheet.description')}
                            </p>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Section 3: Outils Administratifs & Comptables */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-fibem-primary mb-8 flex items-center gap-3">
                    <Receipt className="w-8 h-8" />
                    {t('administrative.title')}
                </h2>
                <div className="bg-white rounded-2xl shadow-md border border-fibem-light overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {[
                            { icon: FileText, title: t('administrative.quoteTemplate.title'), desc: t('administrative.quoteTemplate.description'), color: 'text-blue-600', bg: 'bg-blue-50', href: '/services/modele-devis' },
                            { icon: Receipt, title: t('administrative.invoiceTemplate.title'), desc: t('administrative.invoiceTemplate.description'), color: 'text-green-600', bg: 'bg-green-50', href: '/services/modele-facture' },
                            { icon: FileCheck, title: t('administrative.creditNote.title'), desc: t('administrative.creditNote.description'), color: 'text-purple-600', bg: 'bg-purple-50', href: '/services/modele-avoir' },
                            { icon: Building2, title: t('administrative.establishmentSheet.title'), desc: t('administrative.establishmentSheet.description'), color: 'text-orange-600', bg: 'bg-orange-50', href: '/services/fiche-etablissement' },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 hover:bg-gray-50 transition-colors flex items-start gap-6 group"
                            >
                                <div className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                    <item.icon className={`w-7 h-7 ${item.color}`} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-fibem-dark mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                                <Link href={item.href} className="px-4 py-2 text-fibem-primary border-2 border-fibem-primary rounded-lg hover:bg-fibem-light transition-colors font-bold text-sm opacity-0 group-hover:opacity-100">
                                    {t('administrative.access')}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4: Ouverture sur l'Écosystème */}
            <section className="bg-fibem-light rounded-2xl p-12">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-20 h-20 bg-fibem-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <TrendingUp className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-fibem-dark mb-6">{t('ecosystem.title')}</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                        {t('ecosystem.description')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/services/autres-sites"
                            className="px-8 py-4 bg-fibem-dark text-white font-bold rounded-xl hover:bg-slate-700 transition-colors shadow-lg flex items-center gap-3"
                        >
                            <Shield className="w-5 h-5" />
                            {t('ecosystem.explorePartners')}
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white text-fibem-primary border-2 border-fibem-primary font-bold rounded-xl hover:bg-fibem-light transition-colors flex items-center gap-3"
                        >
                            {t('ecosystem.contactUs')}
                            <ExternalLink className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="bg-fibem-dark text-white rounded-2xl p-12 mt-12 text-center">
                <h2 className="text-3xl font-bold mb-4">{t('footerCta.title')}</h2>
                <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                    {t('footerCta.subtitle')}
                </p>
                <Link
                    href="/inscription"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl text-lg"
                >
                    {t('footerCta.button')}
                    <ExternalLink className="w-6 h-6" />
                </Link>
            </section>
        </div>
    )
}
