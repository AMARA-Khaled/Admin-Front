export const translations = {
  fr: {
    "rapports.title": "Rapports",
    "rapports.subtitle": "Génération et gestion des rapports d'analyse",
    "rapports.new_report": "Nouveau rapport",
    "rapports.generated": "Généré",
    "rapports.sent_reports": "Rapports envoyés",
    "rapports.view_report": "Voir le rapport",
    "rapports.resend": "Renvoyer",
    "rapports.send_report": "Envoyer le rapport",
    "rapports.recipients": "Destinataires",
    "common.cancel": "Annuler",
    "common.close": "Fermer",
  },
  en: {
    "rapports.title": "Reports",
    "rapports.subtitle": "Generation and management of analysis reports",
    "rapports.new_report": "New report",
    "rapports.generated": "Generated",
    "rapports.sent_reports": "Sent reports",
    "rapports.view_report": "View report",
    "rapports.resend": "Resend",
    "rapports.send_report": "Send report",
    "rapports.recipients": "Recipients",
    "common.cancel": "Cancel",
    "common.close": "Close",
  },
  ar: {
    "rapports.title": "التقارير",
    "rapports.subtitle": "إنشاء وإدارة تقارير التحليل",
    "rapports.new_report": "تقرير جديد",
    "rapports.generated": "تم الإنشاء",
    "rapports.sent_reports": "التقارير المُرسلة",
    "rapports.view_report": "عرض التقرير",
    "rapports.resend": "إعادة إرسال",
    "rapports.send_report": "إرسال التقرير",
    "rapports.recipients": "المستقبلين",
    "common.cancel": "إلغاء",
    "common.close": "إغلاق",
  },
}

export function t(key: string, language = "fr"): string {
  return translations[language as keyof typeof translations]?.[key as keyof typeof translations.fr] || key
}
