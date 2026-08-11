'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, Users, AlertOctagon, CheckCircle2, DollarSign, BellRing, 
  Ban, Unlock, ShieldAlert, MapPin, Globe, CreditCard, KeyRound, Save, Check,
  FolderPlus, Layers, Edit3, Eye, EyeOff, Plus
} from 'lucide-react';
import { Seller, Language, ETHIOPIAN_CITIES, SiteSettings, AdminProfile, CategoryItem } from '../types/ecommerce';
import { getTranslation } from '../data/translations';

interface AdminDashboardProps {
  sellers: Seller[];
  lang: Language;
  siteSettings: SiteSettings;
  onUpdateSiteSettings: (newSettings: SiteSettings) => void;
  adminProfile: AdminProfile;
  onUpdateAdminProfile: (newProfile: AdminProfile) => void;
  onToggleBlockSeller: (sellerId: string) => void;
  onRecordPayment: (sellerId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  sellers,
  lang,
  siteSettings,
  onUpdateSiteSettings,
  adminProfile,
  onUpdateAdminProfile,
  onToggleBlockSeller,
  onRecordPayment,
}) => {
  const [activeTab, setActiveTab] = useState<'sellers' | 'branding' | 'financial' | 'categories' | 'security'>('sellers');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Form states initialized from props
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(siteSettings);
  const [profileForm, setProfileForm] = useState<AdminProfile>(adminProfile);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });

  // New Category Form State
  const [newCatAm, setNewCatAm] = useState('');
  const [newCatEn, setNewCatEn] = useState('');

  // Editing existing category state
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editCatAm, setEditCatAm] = useState('');
  const [editCatEn, setEditCatEn] = useState('');

  const activeCount = sellers.filter((s) => s.subscriptionStatus === 'active').length;
  const dueCount = sellers.filter((s) => s.subscriptionStatus === 'due_soon' || s.subscriptionStatus === 'expired').length;
  const blockedCount = sellers.filter((s) => s.subscriptionStatus === 'blocked').length;
  const totalMonthlyRevenue = sellers
    .filter((s) => s.subscriptionStatus === 'active')
    .reduce((acc, s) => acc + s.rentAmount, 0);

  const showFeedback = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings(settingsForm);
    showFeedback(`✅ ${getTranslation(lang, 'settingsSaved')}`);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPass && passwordForm.newPass !== passwordForm.confirm) {
      showFeedback('❌ Password confirmation does not match!');
      return;
    }
    onUpdateAdminProfile(profileForm);
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    showFeedback('✅ Admin profile & credentials updated successfully!');
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatAm.trim() || !newCatEn.trim()) return;

    const id = newCatEn.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newCat: CategoryItem = {
      id,
      nameAm: newCatAm.trim(),
      nameEn: newCatEn.trim(),
      isActive: true,
    };

    const updatedCategories = [...(siteSettings.categories || []), newCat];
    const updatedSettings = { ...siteSettings, categories: updatedCategories };
    
    setSettingsForm(updatedSettings);
    onUpdateSiteSettings(updatedSettings);
    
    setNewCatAm('');
    setNewCatEn('');
    showFeedback(`✅ አዲስ ካታጎሪ "${newCatAm}" በተሳካ ሁኔታ ተጨምሯል!`);
  };

  const handleToggleCategoryStatus = (catId: string) => {
    const updatedCategories = (siteSettings.categories || []).map((cat) =>
      cat.id === catId ? { ...cat, isActive: !cat.isActive } : cat
    );
    const updatedSettings = { ...siteSettings, categories: updatedCategories };
    setSettingsForm(updatedSettings);
    onUpdateSiteSettings(updatedSettings);
    showFeedback('✅ የካታጎሪው ሁኔታ ተቀይሯል!');
  };

  const handleSaveEditCategory = (catId: string) => {
    if (!editCatAm.trim() || !editCatEn.trim()) return;
    const updatedCategories = (siteSettings.categories || []).map((cat) =>
      cat.id === catId ? { ...cat, nameAm: editCatAm.trim(), nameEn: editCatEn.trim() } : cat
    );
    const updatedSettings = { ...siteSettings, categories: updatedCategories };
    setSettingsForm(updatedSettings);
    onUpdateSiteSettings(updatedSettings);
    setEditingCatId(null);
    showFeedback('✅ የካታጎሪው ስም በተሳካ ሁኔታ ተስተካክሏል!');
  };

  const handleSendReminder = (sellerName: string) => {
    showFeedback(`📩 Rent payment reminder notification sent to ${sellerName}!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn text-white">
      
      {/* Admin Title Banner */}
      <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase font-extrabold tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Ethiopian Cities Central Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {getTranslation(lang, 'adminTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {getTranslation(lang, 'adminSubtitle')}
          </p>
        </div>

        <div className="bg-slate-950 px-5 py-3 rounded-2xl border border-slate-800 text-right">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Active Monthly Rent Collected</p>
          <p className="text-2xl font-black text-emerald-400">{totalMonthlyRevenue.toLocaleString()} ETB (ብር)</p>
        </div>
      </div>

      {/* Action Notification Alert */}
      {notificationMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/40 p-4 rounded-2xl text-xs text-emerald-400 font-semibold flex items-center gap-2 animate-fadeIn">
          <BellRing className="w-4 h-4 flex-shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Admin Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('sellers')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-xs transition-all ${
            activeTab === 'sellers'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{getTranslation(lang, 'tabSellerEnforcement')}</span>
        </button>

        <button
          onClick={() => setActiveTab('branding')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-xs transition-all ${
            activeTab === 'branding'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>{getTranslation(lang, 'tabWebsiteSettings')}</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-xs transition-all ${
            activeTab === 'categories'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{getTranslation(lang, 'tabCategories')}</span>
        </button>

        <button
          onClick={() => setActiveTab('financial')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-xs transition-all ${
            activeTab === 'financial'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>{getTranslation(lang, 'tabRentFinancial')}</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-xs transition-all ${
            activeTab === 'security'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>{getTranslation(lang, 'tabAdminSecurity')}</span>
        </button>
      </div>

      {/* TAB 1: SELLER RENT & ACCOUNT ENFORCEMENT */}
      {activeTab === 'sellers' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Overview Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
                <span>{getTranslation(lang, 'totalSellers')}</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-3xl font-black text-white">{sellers.length}</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
                <span>{getTranslation(lang, 'activeSubscribers')}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-3xl font-black text-emerald-400">{activeCount}</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
                <span>{getTranslation(lang, 'dueOverdue')}</span>
                <AlertOctagon className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-3xl font-black text-amber-400">{dueCount}</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
                <span>{getTranslation(lang, 'blockedSellers')}</span>
                <Ban className="w-4 h-4 text-rose-400" />
              </div>
              <p className="text-3xl font-black text-rose-400">{blockedCount}</p>
            </div>
          </div>

          {/* Block Notice Alert */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs text-slate-300 flex items-center gap-3 shadow-inner">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span>
              {getTranslation(lang, 'blockedNotice')} When you click <strong>Block Seller</strong>, all items belonging to that seller across all cities are instantly hidden.
            </span>
          </div>

          {/* Sellers Rent Management Table */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Registered Ethiopian Sellers & Rent Management</h3>
              <span className="text-xs text-slate-400 font-bold">Monthly Fee: {siteSettings.monthlyRentAmount.toLocaleString()} ETB / month</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-4 px-6">{getTranslation(lang, 'sellerName')}</th>
                    <th className="py-4 px-6">{getTranslation(lang, 'city')}</th>
                    <th className="py-4 px-6">{getTranslation(lang, 'rentStatus')}</th>
                    <th className="py-4 px-6">{getTranslation(lang, 'dueDate')}</th>
                    <th className="py-4 px-6 text-right">{getTranslation(lang, 'actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {sellers.map((s) => {
                    const cityInfo = ETHIOPIAN_CITIES.find((c) => c.code === s.city);
                    const isBlocked = s.subscriptionStatus === 'blocked';
                    const isActive = s.subscriptionStatus === 'active';
                    const cityName = cityInfo ? (lang === 'am' ? cityInfo.nameAm : cityInfo.nameEn) : s.city;

                    return (
                      <tr key={s.id} className="hover:bg-slate-800/50 transition-colors">
                        
                        {/* Seller Info */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-white text-sm">{s.businessName}</div>
                          <div className="text-slate-400">{s.name} • {s.email}</div>
                          <div className="text-emerald-400 text-[11px] font-semibold">{s.phone}</div>
                        </td>

                        {/* City */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800 text-slate-200">
                            <MapPin className="w-3 h-3 text-emerald-400" />
                            <span>📍 {cityName}</span>
                          </span>
                        </td>

                        {/* Rent Status Badge */}
                        <td className="py-4 px-6">
                          {isActive && (
                            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              ACTIVE ({siteSettings.monthlyRentAmount.toLocaleString()} ETB Paid)
                            </span>
                          )}
                          {s.subscriptionStatus === 'due_soon' && (
                            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              DUE SOON
                            </span>
                          )}
                          {s.subscriptionStatus === 'expired' && (
                            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                              EXPIRED
                            </span>
                          )}
                          {isBlocked && (
                            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-red-900/40 text-red-400 border border-red-500 animate-pulse">
                              BLOCKED (Hidden)
                            </span>
                          )}
                        </td>

                        {/* Due Date */}
                        <td className="py-4 px-6 font-mono text-slate-300">
                          {s.dueDate}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right space-x-2">
                          {!isActive && (
                            <button
                              onClick={() => onRecordPayment(s.id)}
                              className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-[11px] transition-all"
                              title="Record Rent Payment"
                            >
                              <DollarSign className="w-3.5 h-3.5 inline mr-1" />
                              Mark Paid
                            </button>
                          )}

                          {!isBlocked && (
                            <button
                              onClick={() => handleSendReminder(s.businessName)}
                              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-[11px] border border-slate-700 transition-all"
                              title="Send Payment Reminder"
                            >
                              <BellRing className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                              Remind
                            </button>
                          )}

                          {/* Block / Unblock Button */}
                          <button
                            onClick={() => onToggleBlockSeller(s.id)}
                            className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all shadow-md ${
                              isBlocked
                                ? 'bg-teal-600 hover:bg-teal-500 text-white'
                                : 'bg-rose-600 hover:bg-rose-500 text-white'
                            }`}
                          >
                            {isBlocked ? (
                              <>
                                <Unlock className="w-3.5 h-3.5 inline mr-1" />
                                {getTranslation(lang, 'unblockSeller')}
                              </>
                            ) : (
                              <>
                                <Ban className="w-3.5 h-3.5 inline mr-1" />
                                {getTranslation(lang, 'blockSeller')}
                              </>
                            )}
                          </button>

                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: WEBSITE BRANDING & CONTENT */}
      {activeTab === 'branding' && (
        <form onSubmit={handleSaveSettings} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span>Full Website Branding & Live Content Editor</span>
            </h3>
            <p className="text-xs text-slate-400">
              Customize website titles, announcements, hero descriptions, and contact info live.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Site Name Amharic */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'siteNameAm')}
              </label>
              <input
                type="text"
                value={settingsForm.siteNameAm}
                onChange={(e) => setSettingsForm({ ...settingsForm, siteNameAm: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Site Name English */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'siteNameEn')}
              </label>
              <input
                type="text"
                value={settingsForm.siteNameEn}
                onChange={(e) => setSettingsForm({ ...settingsForm, siteNameEn: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Announcement Amharic */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'announcementAm')}
              </label>
              <input
                type="text"
                value={settingsForm.announcementAm}
                onChange={(e) => setSettingsForm({ ...settingsForm, announcementAm: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Announcement English */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'announcementEn')}
              </label>
              <input
                type="text"
                value={settingsForm.announcementEn}
                onChange={(e) => setSettingsForm({ ...settingsForm, announcementEn: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Hero Title Amharic */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'heroTitleAm')}
              </label>
              <input
                type="text"
                value={settingsForm.heroTitleAm}
                onChange={(e) => setSettingsForm({ ...settingsForm, heroTitleAm: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Hero Title English */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'heroTitleEn')}
              </label>
              <input
                type="text"
                value={settingsForm.heroTitleEn}
                onChange={(e) => setSettingsForm({ ...settingsForm, heroTitleEn: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Hero Subtitle Amharic */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'heroSubtitleAm')}
              </label>
              <textarea
                rows={3}
                value={settingsForm.heroSubtitleAm}
                onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitleAm: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Support Contact Info */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'supportPhone')}
              </label>
              <input
                type="text"
                value={settingsForm.supportPhone}
                onChange={(e) => setSettingsForm({ ...settingsForm, supportPhone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'supportEmail')}
              </label>
              <input
                type="email"
                value={settingsForm.supportEmail}
                onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              <Save className="w-4 h-4" />
              <span>{getTranslation(lang, 'saveChanges')}</span>
            </button>
          </div>

        </form>
      )}

      {/* TAB 3: CATEGORY MANAGEMENT */}
      {activeTab === 'categories' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Add New Category Form */}
          <form onSubmit={handleAddCategory} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-emerald-400" />
                  <span>➕ አዲስ ካታጎሪ ጨምር (Add New Category)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  አዲስ የካታጎሪ አይነት በመጨመር በዌብሳይቱ እና በሻጮች መጫኛ ገጽ ላይ በቀጥታ ያስገቡ።
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  የካታጎሪው ስም በአማርኛ (e.g. የውበት እና ኮስሞቲክስ)
                </label>
                <input
                  type="text"
                  placeholder="ምሳሌ፡ የውበት እና ኮስሞቲክስ"
                  value={newCatAm}
                  onChange={(e) => setNewCatAm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  የካታጎሪው ስም በእንግሊዘኛ (e.g. Beauty & Cosmetics)
                </label>
                <input
                  type="text"
                  placeholder="Example: Beauty & Cosmetics"
                  value={newCatEn}
                  onChange={(e) => setNewCatEn(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>አዲስ ካታጎሪ መዝግብ (Save Category)</span>
              </button>
            </div>
          </form>

          {/* Existing Categories List */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>የነባር ካታጎሪዎች ዝርዝር (Manage Active Categories)</span>
              </h3>
              <span className="text-xs text-slate-400 font-bold">
                ጠቅላላ፡ {siteSettings.categories?.length || 0} ካታጎሪዎች
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-4 px-6">ID</th>
                    <th className="py-4 px-6">የካታጎሪው ስም (አማርኛ)</th>
                    <th className="py-4 px-6">የካታጎሪው ስም (English)</th>
                    <th className="py-4 px-6">ሁኔታ (Status)</th>
                    <th className="py-4 px-6 text-right">እርምጃዎች (Actions)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {(siteSettings.categories || []).map((cat) => {
                    const isEditing = editingCatId === cat.id;

                    return (
                      <tr key={cat.id} className="hover:bg-slate-800/50 transition-colors">
                        
                        <td className="py-4 px-6 font-mono text-slate-400">
                          {cat.id}
                        </td>

                        <td className="py-4 px-6 font-bold text-white text-sm">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editCatAm}
                              onChange={(e) => setEditCatAm(e.target.value)}
                              className="bg-slate-950 border border-emerald-500 rounded-lg px-3 py-1 text-xs text-white focus:outline-none"
                            />
                          ) : (
                            cat.nameAm
                          )}
                        </td>

                        <td className="py-4 px-6 text-slate-300 font-medium">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editCatEn}
                              onChange={(e) => setEditCatEn(e.target.value)}
                              className="bg-slate-950 border border-emerald-500 rounded-lg px-3 py-1 text-xs text-white focus:outline-none"
                            />
                          ) : (
                            cat.nameEn
                          )}
                        </td>

                        <td className="py-4 px-6">
                          {cat.isActive ? (
                            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              ACTIVE (የሚታይ)
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-800 text-slate-400 border border-slate-700">
                              DISABLED (የተሸሸገ)
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6 text-right space-x-2">
                          {isEditing ? (
                            <button
                              onClick={() => handleSaveEditCategory(cat.id)}
                              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-[11px]"
                            >
                              <Save className="w-3.5 h-3.5 inline mr-1" />
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingCatId(cat.id);
                                setEditCatAm(cat.nameAm);
                                setEditCatEn(cat.nameEn);
                              }}
                              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-[11px] border border-slate-700"
                            >
                              <Edit3 className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                              Edit
                            </button>
                          )}

                          <button
                            onClick={() => handleToggleCategoryStatus(cat.id)}
                            className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all ${
                              cat.isActive
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            }`}
                          >
                            {cat.isActive ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5 inline mr-1 text-rose-400" />
                                Disable
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
                                Enable
                              </>
                            )}
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: RENT & FINANCIAL CONFIG */}
      {activeTab === 'financial' && (
        <form onSubmit={handleSaveSettings} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <span>Monthly Seller Rent & Financial Receiving Accounts</span>
            </h3>
            <p className="text-xs text-slate-400">
              Configure the monthly rent rate for sellers and admin Telebirr / CBE payment receiving accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Monthly Rent Rate */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'monthlyRentRate')}
              </label>
              <input
                type="number"
                value={settingsForm.monthlyRentAmount}
                onChange={(e) => setSettingsForm({ ...settingsForm, monthlyRentAmount: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono text-emerald-400 font-bold"
                required
              />
            </div>

            {/* Telebirr Receiving Number */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'telebirrAccount')}
              </label>
              <input
                type="text"
                value={settingsForm.telebirrAccount}
                onChange={(e) => setSettingsForm({ ...settingsForm, telebirrAccount: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                required
              />
            </div>

            {/* CBE Account Number */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'cbeAccount')}
              </label>
              <input
                type="text"
                value={settingsForm.cbeAccount}
                onChange={(e) => setSettingsForm({ ...settingsForm, cbeAccount: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                required
              />
            </div>

          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              <Save className="w-4 h-4" />
              <span>{getTranslation(lang, 'saveChanges')}</span>
            </button>
          </div>

        </form>
      )}

      {/* TAB 5: ADMIN PROFILE & SECURITY */}
      {activeTab === 'security' && (
        <form onSubmit={handleSaveProfile} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-emerald-400" />
              <span>Admin Profile Credentials & Security Control</span>
            </h3>
            <p className="text-xs text-slate-400">
              Update admin administrator name, contact email, phone, and security password.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Admin Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'adminName')}
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Admin Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'adminEmail')}
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Admin Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'adminPhone')}
              </label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'adminPassword')}
              </label>
              <input
                type="password"
                placeholder="Leave blank to keep current"
                value={passwordForm.newPass}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {getTranslation(lang, 'confirmPassword')}
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              <Check className="w-4 h-4" />
              <span>{getTranslation(lang, 'updateProfile')}</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
