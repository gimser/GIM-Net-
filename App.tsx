
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Network, Home, ShoppingCart, Phone, Menu, X, ArrowRight, Zap, 
  Shield, Cpu, Send, Trash2, Search, Settings, Camera, Bot, 
  ShoppingBasket, ShieldCheck, Wifi, Layout, Smartphone, MessageCircle, Mail, Heart,
  Activity, Lock, Server, Layers, Globe, Code, Database, MousePointer2, Sparkles, Terminal, 
  Lightbulb, Thermometer, Mic, Fingerprint, Eye, Radio, Gauge, Binary, MonitorCheck, Power,
  Award, Clock, CheckCircle2, ShieldAlert, Verified, Orbit, Laptop, Cloud
} from 'lucide-react';
import { Language, PageId, Product, CartItem } from './types';
import { TRANSLATIONS, MOCK_PRODUCTS, VIDEO_PATHS } from './constants';
import { askGIM } from './geminiService';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ma');
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  
  // AI Demo States
  const [aiDemoInput, setAiDemoInput] = useState('');
  const [aiDemoResult, setAiDemoResult] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // Smart Home Demo States
  const [smartLights, setSmartLights] = useState(false);
  const [smartTemp, setSmartTemp] = useState(22);
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('gim_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('gim_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('gim_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('gim_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isRtl = lang === 'ar' || lang === 'ma';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lang, currentPage, isRtl]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? {...i, quantity: i.quantity + 1} : i);
      return [...prev, { product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.product.id !== id));
  const cartTotal = useMemo(() => cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0), [cart]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const msg = userInput;
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setUserInput('');
    setIsTyping(true);
    try {
      const response = await askGIM(msg, lang);
      setChatMessages(prev => [...prev, { role: 'bot', text: response || 'Error' }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'bot', text: 'Service busy. Call +212 770501853.' }]);
    } finally { setIsTyping(false); }
  };

  const handleAiDemo = async () => {
    if (!aiDemoInput.trim()) return;
    setIsAiProcessing(true);
    setAiDemoResult('');
    try {
      const response = await askGIM(`أنت خبير تقني في شركة Electro GIM. قم بتحليل تقني أو اقتراح بنية برمجية ذكية لهذا الطلب: ${aiDemoInput}`, lang);
      setAiDemoResult(response);
    } catch (e) {
      setAiDemoResult("Neural Overload. Re-initializing Gemini Protocol...");
    } finally {
      setIsAiProcessing(false);
    }
  };

  const Header = () => (
    <header className="fixed top-0 w-full z-[100] glass border-b border-white/5">
      <div className="wave-container pointer-events-none opacity-50"><div className="wave"></div></div>
      <div className="container mx-auto px-6 h-24 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setCurrentPage('home')}>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-5xl font-black gradient-text tracking-tighter uppercase italic">Electro GIM</span>
            <span className="text-xl font-bold text-white uppercase tracking-wider opacity-80 hidden sm:block">Services</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 font-bold text-[11px] uppercase tracking-[0.1em]">
          {['networks', 'websites', 'smarthome', 'store'].map(page => (
            <button key={page} onClick={() => setCurrentPage(page as PageId)} className={`hover:text-yellow-500 transition-all ${currentPage === page ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-300'}`}>
              {t.nav[page as keyof typeof t.nav]}
            </button>
          ))}
          <select value={lang} onChange={(e) => setLang(e.target.value as Language)} className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white outline-none text-[10px] font-bold">
            <option value="ma">🇲🇦 المغربية</option>
            <option value="ar">🇸🇦 العربية</option>
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="de">🇩🇪 Deutsch</option>
          </select>
        </div>

        <div className="flex items-center gap-2 md:gap-4 relative z-20">
          <button onClick={() => setShowWishlist(true)} className="relative p-2 text-white hover:text-red-500 transition-colors">
            <Heart size={22} className={wishlist.length > 0 ? "fill-red-500 text-red-500" : ""} />
            {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center animate-bounce">{wishlist.length}</span>}
          </button>
          <button onClick={() => setShowCart(true)} className="relative p-2 text-white hover:text-yellow-500 transition-colors">
            <ShoppingBasket size={22} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center animate-pulse">{cart.length}</span>}
          </button>
          <button onClick={() => setIsChatOpen(true)} className="bg-gradient-to-r from-[#FFD700] to-[#1E90FF] px-4 md:px-6 py-2 md:py-3 rounded-xl font-black text-[10px] md:text-xs uppercase text-white shadow-xl flex items-center gap-2 md:gap-3 hover:scale-105 active:scale-95 transition-all">
            <Bot size={18} /> <span className="hidden sm:inline">{lang === 'ma' ? 'تحدث معنا' : 'GIM AI'}</span>
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white p-2 glass rounded-lg transition-transform active:scale-90">
            {isMenuOpen ? <X size={24} /> : <Menu size={24}/>}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden animate-in slide-in-from-top-4 duration-300 bg-slate-900/95 backdrop-blur-2xl border-t border-white/10 p-6 shadow-2xl flex flex-col gap-2 relative z-50">
          {['networks', 'websites', 'smarthome', 'store'].map(page => (
            <button key={page} onClick={() => {setCurrentPage(page as PageId); setIsMenuOpen(false)}} className={`text-right font-black uppercase tracking-widest p-4 rounded-2xl transition-all ${currentPage === page ? 'bg-yellow-500 text-black' : 'text-white hover:bg-white/5'}`}>
              {t.nav[page as keyof typeof t.nav]}
            </button>
          ))}
          <div className="pt-4 border-t border-white/5 mt-2">
            <select value={lang} onChange={(e) => setLang(e.target.value as Language)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none font-bold">
              <option value="ma">🇲🇦 المغربية</option>
              <option value="ar">🇸🇦 العربية</option>
              <option value="en">🇬🇧 English</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="de">🇩🇪 Deutsch</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );

  const HomeView = () => (
    <div className="animate-in fade-in duration-1000">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video key={lang} autoPlay muted playsInline loop className="absolute inset-0 w-full h-full object-cover brightness-[0.25] scale-105 transition-all duration-1000">
          <source src={VIDEO_PATHS.home[lang] || VIDEO_PATHS.home.en} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
        <div className="relative z-10 text-center px-6 max-w-7xl space-y-8 md:space-y-12">
           <div className="inline-flex items-center gap-4 px-6 md:px-8 py-2 rounded-full glass border-yellow-500/20 text-yellow-500 font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[8px] md:text-[10px]">
             <Zap size={14} className="animate-pulse" /> TECHNOLOGY INTEGRATION PRO
           </div>
           <h1 className="text-5xl md:text-[11rem] font-black tracking-tighter leading-none">
              <span className="gradient-text uppercase">Electro GIM</span><br/>
              <span className="text-white drop-shadow-2xl uppercase">Services</span>
           </h1>
           <p className="text-lg md:text-4xl text-gray-300 font-bold max-w-4xl mx-auto leading-relaxed italic drop-shadow-lg">
              {t.hero.desc}
           </p>
           <button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-[#FFD700] to-[#1E90FF] text-white px-8 md:px-16 py-5 md:py-8 rounded-2xl md:rounded-[2.5rem] font-black text-lg md:text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-4 mx-auto border-b-8 border-black/20 thunder-pulse">
              {lang === 'ma' ? 'إبدأ المشروع ديالك' : 'Launch Project'} <ArrowRight />
           </button>
        </div>
      </section>

      <section id="booking" className="py-20 md:py-32 relative overflow-hidden bg-slate-900/30">
        <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
           <div className="glass p-6 md:p-12 rounded-3xl md:rounded-[4rem] border-white/10 shadow-2xl space-y-8 md:space-y-10 relative group">
              <div className="text-center space-y-4">
                 <h3 className="text-3xl md:text-4xl font-black gradient-text uppercase tracking-tighter">{t.booking.title}</h3>
                 <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-500 to-blue-600 rounded-full mx-auto flex items-center justify-center shadow-lg border-4 border-white/5 overflow-hidden group-hover:scale-110 transition-transform">
                    <ShieldCheck className="text-white" size={32} md:size={40} />
                 </div>
              </div>
              <form className="grid md:grid-cols-2 gap-6 md:gap-8" onSubmit={(e) => {e.preventDefault(); alert('Order received! We will contact you.');}}>
                 {[
                   { label: t.booking.name, placeholder: 'GIM Client', type: 'text' },
                   { label: t.booking.email, placeholder: 'client@gim.com', type: 'email' },
                   { label: t.booking.phone, placeholder: '+212 7 ...', type: 'text' }
                 ].map((field, i) => (
                    <div key={i} className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 px-4">{field.label}</label>
                       <input required type={field.type} placeholder={field.placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-6 py-4 md:py-5 outline-none focus:border-yellow-500 text-white font-bold transition-all text-sm" />
                    </div>
                 ))}
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 px-4">{t.booking.service}</label>
                    <select required className="w-full bg-slate-900 border border-white/10 rounded-xl md:rounded-2xl px-6 py-4 md:py-5 outline-none focus:border-yellow-500 text-white font-bold transition-all appearance-none text-sm">
                       <option value="">---- {lang === 'ma' ? 'تحديد' : 'Select'} ----</option>
                       <option>{t.nav.networks}</option>
                       <option>{t.nav.smarthome}</option>
                       <option>{t.nav.websites}</option>
                    </select>
                 </div>
                 <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 px-4">{t.booking.address}</label>
                    <textarea required placeholder="..." className="w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl px-6 py-4 md:py-5 outline-none focus:border-yellow-500 text-white font-bold h-24 resize-none transition-all text-sm" />
                 </div>
                 <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 px-4">{t.booking.desc}</label>
                    <textarea required placeholder="..." className="w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl px-6 py-4 md:py-5 outline-none focus:border-yellow-500 text-white font-bold h-32 md:h-40 resize-none transition-all text-sm" />
                 </div>
                 <button type="submit" className="md:col-span-2 bg-gradient-to-r from-[#FFD700] to-[#1E90FF] py-6 md:py-8 rounded-2xl md:rounded-[2.5rem] font-black text-xl md:text-2xl uppercase tracking-widest text-white shadow-2xl hover:brightness-125 transition-all border-b-8 border-black/20">
                    {t.booking.submit}
                 </button>
              </form>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                { id: 'smarthome', title: t.nav.smarthome, desc: t.store.wishlist, icon: Cpu, color: 'yellow' },
                { id: 'websites', title: t.nav.websites, desc: t.nav.websites, icon: Layout, color: 'blue' },
                { id: 'networks', title: t.nav.networks, desc: t.nav.networks, icon: Wifi, color: 'blue' },
                { id: 'store', title: t.nav.store, desc: t.store.title, icon: ShoppingBasket, color: 'yellow' }
              ].map((card, i) => (
                 <div key={i} onClick={() => setCurrentPage(card.id as PageId)} className="glass p-8 md:p-10 rounded-3xl md:rounded-[3.5rem] border-white/5 group hover:border-yellow-500/50 transition-all cursor-pointer flex flex-col items-center text-center space-y-6 hover-lift">
                    <div className={`p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 text-${card.color === 'yellow' ? 'yellow-500' : 'blue-500'} group-hover:bg-white group-hover:text-black transition-all`}>
                       <card.icon size={48} md:size={56} />
                    </div>
                    <h4 className="text-xl md:text-2xl font-black uppercase text-white tracking-tighter leading-tight">{card.title}</h4>
                    <button className="text-yellow-500 font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                       {lang === 'ma' ? 'عرض المزيد' : 'View Details'} <ArrowRight size={14} />
                    </button>
                 </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );

  const StoreView = () => (
    <div className="pt-32 md:pt-48 container mx-auto px-6 pb-40 md:pb-60 max-w-7xl animate-in slide-in-from-bottom-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12 border-b border-white/5 pb-10 md:pb-16">
        <div className="space-y-4 md:space-y-6 text-right">
          <h2 className="text-5xl md:text-[11rem] font-black gradient-text uppercase tracking-tighter leading-none drop-shadow-2xl">GIM SHOP</h2>
          <p className="text-xl md:text-3xl text-gray-500 font-black">{t.store.title}</p>
        </div>
        <div className="w-full md:w-[450px] relative group">
          <div className="absolute inset-y-0 right-6 md:right-8 flex items-center text-gray-500 group-focus-within:text-yellow-500 transition-colors"><Search size={24} md:size={32} /></div>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.store.search} className="w-full glass bg-white/5 border border-white/10 rounded-full px-8 md:px-12 py-5 md:py-8 outline-none focus:border-yellow-500 transition-all font-black text-white text-lg md:text-xl pr-16 md:pr-20" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
        {MOCK_PRODUCTS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map(p => {
          const inWishlist = wishlist.find(wi => wi.id === p.id);
          return (
            <div key={p.id} className="glass group rounded-[3rem] md:rounded-[5rem] overflow-hidden transition-all border-white/5 flex flex-col h-full relative hover-lift">
              <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.title}/>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }} 
                  className={`absolute top-6 right-6 md:top-8 md:right-8 p-3 md:p-4 rounded-full glass border-white/10 transition-all hover:scale-110 active:scale-95 ${inWishlist ? "bg-red-500 text-white" : "text-white/50 hover:text-red-400"}`}
                >
                  <Heart size={20} md:size={24} fill={inWishlist ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="p-8 md:p-12 space-y-6 md:space-y-8 flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter leading-tight">{p.title}</h3>
                  <span className="text-2xl md:text-3xl font-black text-yellow-500">{p.price} MAD</span>
                </div>
                <button onClick={() => addToCart(p)} className="w-full bg-gradient-to-r from-[#FFD700] to-[#1E90FF] py-6 md:py-8 rounded-2xl md:rounded-[2.5rem] font-black text-xl md:text-2xl uppercase tracking-widest shadow-2xl hover:brightness-125 transition-all text-white flex items-center justify-center gap-4">
                  {t.store.addToCart} <ShoppingCart size={24} md:size={28} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const ServiceDetailView = () => {
    const service = t.services[currentPage];
    if (!service) return null;

    const getIcon = (index: number) => {
      if (currentPage === 'networks') return [Camera, Wifi, Shield, Eye][index % 4];
      if (currentPage === 'websites') return [Sparkles, Smartphone, Search, Database][index % 4];
      if (currentPage === 'smarthome') return [Lightbulb, Fingerprint, Thermometer, Mic][index % 4];
      return Zap;
    };

    return (
      <div className="animate-in fade-in duration-1000 pb-20 md:pb-40 relative">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 rounded-full blur-[100px] md:blur-[180px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[-5%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-yellow-500/10 rounded-full blur-[100px] md:blur-[180px] animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <section className="relative h-[80vh] md:h-[95vh] flex items-center justify-center overflow-hidden">
          <video key={currentPage} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover brightness-[0.15] scale-105 transition-transform duration-[20s] hover:scale-125">
            <source src={currentPage === 'networks' ? VIDEO_PATHS.networks.hero : currentPage === 'websites' ? VIDEO_PATHS.websites.hero : VIDEO_PATHS.smarthome.hero} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950" />
          <div className="relative z-10 text-center space-y-10 md:space-y-16 px-6 max-w-7xl animate-in slide-in-from-top-20 duration-1000">
             <div className="inline-flex items-center gap-3 md:gap-5 px-6 md:px-10 py-2 md:py-3 rounded-full glass border-yellow-500/30 text-yellow-400 font-black text-[8px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] shadow-[0_0_50px_rgba(234,179,8,0.25)]">
                <Settings size={16} md:size={20} className="animate-spin-slow" /> GIM {currentPage.toUpperCase()} UNIT v4.1
             </div>
            <h2 className="text-4xl md:text-[12rem] font-black gradient-text uppercase tracking-tighter leading-[1] md:leading-[0.8] italic drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">{service.title}</h2>
            <div className="flex justify-center md:justify-end">
              <p className="text-xl md:text-6xl text-gray-300 font-bold max-w-5xl leading-tight border-r-4 md:border-r-8 border-yellow-500 pr-6 md:pr-12 text-right drop-shadow-2xl">{service.desc}</p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 -mt-32 md:-mt-56 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {service.features?.map((feature: any, i: number) => {
              const Icon = getIcon(i);
              return (
                <div key={i} className="glass p-8 md:p-12 rounded-[3rem] md:rounded-[5rem] border-white/10 hover-lift group relative overflow-hidden backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-b-4 border-b-transparent hover:border-b-yellow-500 transition-all duration-500">
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-yellow-500/20 to-transparent blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-1000" />
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center text-yellow-500 mb-8 md:mb-12 group-hover:scale-110 group-hover:rotate-[15deg] transition-all border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] relative z-10">
                    <Icon size={40} md:size={64} className="group-hover:drop-shadow-[0_0_20px_rgba(234,179,8,1)]" />
                  </div>
                  <h4 className="text-2xl md:text-4xl font-black text-white uppercase mb-6 md:mb-8 tracking-tighter relative z-10 leading-none">{feature.title}</h4>
                  <p className="text-gray-400 font-bold text-lg md:text-2xl leading-relaxed relative z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500">{feature.detail}</p>
                </div>
              );
            })}
          </div>

          {currentPage === 'networks' && (
             <div className="mt-24 md:mt-48 glass p-8 md:p-24 rounded-[3rem] md:rounded-[7rem] border-blue-500/30 overflow-hidden relative shadow-[0_0_150px_rgba(30,144,255,0.1)]">
                <div className="absolute top-0 right-0 p-20 opacity-5 hidden lg:block"><Network size={600} className="text-blue-400" /></div>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-16 md:gap-32 relative z-10">
                   <div className="flex-1 space-y-8 md:space-y-12">
                      <div className="inline-flex items-center gap-3 text-blue-400 font-black uppercase text-[10px] md:text-sm tracking-widest bg-blue-500/10 px-4 md:px-6 py-2 rounded-xl border border-blue-500/20"><Binary size={18}/> SECURE NETWORK BRIDGE</div>
                      <h3 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-none">Infrastructure Monitoring</h3>
                      <p className="text-xl md:text-3xl text-gray-400 font-bold leading-relaxed">{lang === 'ma' ? 'تحكم كامل ومراقبة حية للشبكة ديالك. كنوفروا ليك أنظمة أمان استباقية كتحمي البيانات ديالك 24/7.' : 'Complete control and live monitoring of your network. We provide proactive security systems that protect your data 24/7.'}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                         {[
                           { label: 'Uptime Protocol', value: '99.99%', icon: Activity, color: 'text-green-500' },
                           { label: 'Encrypted Links', value: '8,421', icon: Lock, color: 'text-blue-500' },
                           { label: 'Latency Node', value: '0.4ms', icon: Zap, color: 'text-yellow-500' },
                           { label: 'Core Traffic', value: 'Active', icon: Orbit, color: 'text-indigo-500' }
                         ].map((stat, idx) => (
                            <div key={idx} className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/5 border border-white/10 flex items-center gap-6 md:gap-8 hover:bg-white/10 transition-all">
                               <div className={`${stat.color} p-4 rounded-xl md:rounded-2xl bg-white/5`}><stat.icon size={24} md:size={40}/></div>
                               <div>
                                  <div className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mb-1">{stat.label}</div>
                                  <div className="text-2xl md:text-4xl font-black text-white tracking-tighter">{stat.value}</div>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                   <div className="w-full lg:w-[500px] h-[300px] md:h-[500px] relative">
                      <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse" />
                      <div className="w-full h-full rounded-[3rem] md:rounded-[6rem] border-4 border-white/5 flex items-center justify-center relative overflow-hidden group">
                         <MonitorCheck size={180} md:size={280} className="text-white drop-shadow-[0_0_50px_rgba(30,144,255,0.8)] animate-float" />
                         <div className="absolute bottom-8 md:bottom-12 px-6 py-2 bg-blue-600 rounded-full text-white font-black text-sm md:text-lg uppercase tracking-tighter shadow-xl">GIM NOC ACTIVE</div>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {currentPage === 'websites' && (
            <div className="mt-24 md:mt-48 glass rounded-[3rem] md:rounded-[8rem] border-indigo-500/30 overflow-hidden relative shadow-[0_0_200px_rgba(79,70,229,0.2)]">
              <div className="bg-slate-950/80 p-8 md:p-12 border-b border-white/10 flex justify-between items-center backdrop-blur-xl">
                <div className="flex gap-3 md:gap-5">
                   <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.6)]" />
                   <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-amber-500" />
                   <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-emerald-500" />
                </div>
                <h3 className="text-lg md:text-3xl font-black text-indigo-400 uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center gap-4 md:gap-8"><Terminal size={24} md:size={40}/> GIM CODE ANALYZER v2.0</h3>
              </div>
              <div className="p-8 md:p-32 grid lg:grid-cols-2 gap-16 md:gap-32 bg-slate-900/60">
                <div className="space-y-12 md:space-y-16">
                  <div className="inline-flex items-center gap-3 md:gap-5 px-6 md:px-8 py-2 md:py-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 font-black text-sm md:text-lg uppercase tracking-widest"><Sparkles size={20} md:size={24}/> AI Laboratory</div>
                  <h4 className="text-4xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[1] md:leading-[0.8] italic">Intelligent Architecture</h4>
                  <p className="text-xl md:text-3xl text-gray-400 font-bold leading-relaxed border-l-4 border-indigo-500 pl-6 md:pl-10">
                    {lang === 'ma' ? 'المواقع ديالنا مجهزة بذكاء اصطناعي حقيقي. وصف لينا المشروع ديالك وغادي Gemini API يعطيك تحليل تقني واقتراحات فورية.' : 'Our platforms are powered by real AI. Describe your project and Gemini API will provide a technical analysis and instant suggestions.'}
                  </p>
                  <div className="space-y-8 md:space-y-10">
                    <textarea 
                      value={aiDemoInput}
                      onChange={e => setAiDemoInput(e.target.value)}
                      placeholder={lang === 'ma' ? 'اكتب تفاصيل الموقع أو التطبيق لي باغي...' : 'Describe the web app you want...'}
                      className="w-full bg-black/50 border-2 border-white/10 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-12 text-xl md:text-3xl font-bold text-white outline-none focus:border-indigo-500 h-60 md:h-80 resize-none shadow-inner"
                    />
                    <button 
                      onClick={handleAiDemo}
                      disabled={isAiProcessing}
                      className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 py-8 md:py-12 rounded-2xl md:rounded-[3.5rem] text-xl md:text-4xl font-black text-white uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-6 md:gap-8 disabled:opacity-50"
                    >
                      {isAiProcessing ? <Cpu className="animate-spin-slow" size={32} md:size={48} /> : <Code size={32} md:size={48} />}
                      {lang === 'ma' ? 'تحليل تقني عبر GIM AI' : 'Analyze via GIM AI'}
                    </button>
                  </div>
                </div>
                <div className="bg-black/90 p-8 md:p-20 rounded-[3rem] md:rounded-[7rem] border-2 border-indigo-500/20 shadow-[0_0_150px_rgba(0,0,0,1)] relative overflow-hidden min-h-[500px] md:min-h-[700px] flex flex-col font-mono text-lg md:text-2xl">
                   <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 animate-scanline" />
                   <div className="text-green-500 font-black mb-6 md:mb-10 flex items-center gap-3"><div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" /> $ gim-cli --analyze --mode=pro</div>
                   <div className="text-gray-300 leading-relaxed italic whitespace-pre-line border-l-4 border-white/5 pl-6 md:pl-10 flex-1">
                      {aiDemoResult || (lang === 'ma' ? "في انتظار المدخلات لبدء المعالجة الذكية..." : "Awaiting input signals for processing...")}
                   </div>
                   {isAiProcessing && (
                      <div className="mt-8 space-y-4 md:space-y-6 animate-pulse">
                         <div className="w-full h-3 md:h-4 bg-white/5 rounded-full overflow-hidden"><div className="w-full h-full bg-indigo-500 animate-progress" /></div>
                         <div className="text-indigo-400 font-black text-lg md:text-xl text-center uppercase tracking-widest">Compiling AI Logic...</div>
                      </div>
                   )}
                </div>
              </div>
            </div>
          )}

          {currentPage === 'smarthome' && (
             <div className="mt-24 md:mt-48 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
                <div className="glass p-10 md:p-20 rounded-[3rem] md:rounded-[7rem] border-yellow-500/20 space-y-8 md:space-y-12 bg-gradient-to-br from-slate-950 to-slate-900 relative overflow-hidden group shadow-2xl">
                   <div className="absolute -top-20 -right-20 p-20 opacity-5 group-hover:scale-110 transition-transform duration-1000 hidden md:block"><Lightbulb size={400}/></div>
                   <div className="flex justify-between items-start relative z-10">
                      <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none italic">Automation Control</h3>
                      <button onClick={() => setSmartLights(!smartLights)} className={`p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] transition-all duration-500 shadow-2xl ${smartLights ? 'bg-yellow-500 text-black scale-110' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}>
                         <Power size={32} md:size={48} />
                      </button>
                   </div>
                   <p className="text-xl md:text-3xl text-gray-400 font-bold relative z-10 leading-relaxed">{lang === 'ma' ? 'تحكم فدارك من بلاصتك. الضو، السخونية، وحتى الأجهزة الترفيهية بضغطة زر واحدة من الهاتف.' : 'Full control of your home. Lights, heat, and even entertainment devices with a single tap from your phone.'}</p>
                   <div className="space-y-8 md:space-y-10 relative z-10">
                      <div className="space-y-4">
                         <div className="flex justify-between font-black uppercase text-[10px] md:text-sm tracking-widest text-gray-500"><span>Target Temp</span> <span>{smartTemp}°C</span></div>
                         <input type="range" min="16" max="30" value={smartTemp} onChange={e => setSmartTemp(parseInt(e.target.value))} className="w-full h-2 md:h-3 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                         <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center gap-6 group hover:bg-white/10 transition-all cursor-pointer">
                            <Laptop size={28} md:size={32} className="text-blue-400" /> <span className="font-black text-lg md:text-xl uppercase">Office Mode</span>
                         </div>
                         <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center gap-6 group hover:bg-white/10 transition-all cursor-pointer">
                            <Cloud size={28} md:size={32} className="text-indigo-400" /> <span className="font-black text-lg md:text-xl uppercase">Away Mode</span>
                         </div>
                      </div>
                   </div>
                </div>
                
                <div className="glass p-10 md:p-20 rounded-[3rem] md:rounded-[7rem] border-blue-500/20 space-y-8 md:space-y-12 bg-gradient-to-br from-slate-950 to-slate-900 relative overflow-hidden group shadow-2xl">
                   <div className="absolute -top-20 -right-20 p-20 opacity-5 group-hover:scale-110 transition-transform duration-1000 hidden md:block"><ShieldCheck size={400}/></div>
                   <div className="flex justify-between items-start relative z-10">
                      <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none italic">Secure Bio-Hub</h3>
                      <div className={`p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-blue-500/20 text-blue-400 border border-blue-500/30 ${isBiometricScanning ? 'animate-pulse' : ''}`}>
                         <Lock size={32} md:size={48} />
                      </div>
                   </div>
                   <p className="text-xl md:text-3xl text-gray-400 font-bold relative z-10 leading-relaxed">{lang === 'ma' ? 'أمان بيومتري متقدم. البصمة والتعرف على الوجه كيحميو العائلة ديالك من أي متطفل.' : 'Advanced biometric security. Fingerprint and facial recognition protect your family from any intruder.'}</p>
                   <div className="w-full h-60 md:h-80 bg-black/40 rounded-[2rem] md:rounded-[4rem] border-2 border-white/5 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-blue-500/40 transition-all cursor-pointer" onClick={() => { setIsBiometricScanning(true); setTimeout(() => setIsBiometricScanning(false), 2000); }}>
                      <div className={`absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,1)] ${isBiometricScanning ? 'animate-scanline' : 'hidden'}`} />
                      <Fingerprint size={100} md:size={140} className={`transition-all duration-500 ${isBiometricScanning ? 'text-blue-400 scale-110 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]' : 'text-blue-500/40'}`} />
                      <div className="mt-6 md:mt-8 font-black uppercase text-[10px] md:text-sm tracking-widest text-blue-400">{isBiometricScanning ? 'Scanning Identity...' : 'Tap to Test Scanner'}</div>
                   </div>
                </div>
             </div>
          )}

          <div className="mt-32 md:mt-60 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-blue-500 to-yellow-500 rounded-[5rem] md:rounded-[10rem] blur-xl md:blur-2xl opacity-10 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative glass p-10 md:p-32 rounded-[3rem] md:rounded-[10rem] border-white/10 flex flex-col md:flex-row items-center gap-16 md:gap-32 bg-slate-950/80 backdrop-blur-3xl overflow-hidden shadow-2xl">
              <div className="flex-1 space-y-12 md:space-y-16 text-center md:text-right relative z-10">
                <div className="flex flex-col gap-6 md:gap-8">
                  <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full w-fit mx-auto md:ml-auto md:mr-0">
                    <Verified size={16} className="text-blue-400" />
                    <span className="text-[8px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-gray-400">Premium Partner Solution</span>
                  </div>
                  <h3 className="text-4xl md:text-[14rem] font-black text-white uppercase tracking-tighter leading-[1] md:leading-[0.75] italic">
                    {lang === 'ma' ? 'باغي جودة احترافية؟' : lang === 'ar' ? 'تبحث عن جودة احترافية؟' : 'Ready for PRO Tier?'}
                  </h3>
                  <p className="text-xl md:text-5xl text-gray-400 font-bold max-w-5xl ml-auto leading-tight italic">
                    {lang === 'ma' ? 'بدا المشروع ديالك دابا بأحدث التقنيات فالمغرب. جودة عالمية، أمان تام، ونتائج مبهرة.' : 'Launch your vision with Morocco\'s leading tech force. Global quality, absolute security, stunning results.'}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 pt-4 md:pt-8">
                   {[
                     { icon: Award, label: 'Quality' },
                     { icon: Clock, label: '24/7 Support' },
                     { icon: Verified, label: 'Secure' },
                     { icon: Orbit, label: 'Innovation' }
                   ].map((badge, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3 group/badge">
                         <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 group-hover/badge:bg-white group-hover/badge:text-black transition-all duration-500">
                           <badge.icon size={24} md:size={28} />
                         </div>
                         <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover/badge:text-white transition-colors">{badge.label}</span>
                      </div>
                   ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-6 md:gap-12 justify-center md:justify-start pt-6 md:pt-10">
                  <button onClick={() => setCurrentPage('home')} className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black px-12 md:px-20 py-6 md:py-10 rounded-2xl md:rounded-[3.5rem] font-black text-xl md:text-3xl uppercase tracking-[0.1em] md:tracking-[0.2em] shadow-[0_30px_100px_rgba(234,179,8,0.4)] hover:scale-105 active:scale-95 transition-all border-b-8 md:border-b-[12px] border-black/20 thunder-pulse">
                    {t.hero.cta}
                  </button>
                  <a href="tel:+212770501853" className="group/btn glass border-white/20 px-12 md:px-20 py-6 md:py-10 rounded-2xl md:rounded-[3.5rem] font-black text-xl md:text-3xl uppercase tracking-[0.1em] md:tracking-[0.2em] text-white hover:bg-white/10 transition-all flex items-center justify-center gap-6 md:gap-8 shadow-2xl relative">
                    <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <Phone size={32} md:size={40} className="group-hover/btn:rotate-12 transition-transform" /> 
                    <span>{lang === 'ma' ? 'اتصل بنا' : 'Support'}</span>
                  </a>
                </div>
              </div>
              <div className="hidden lg:flex w-[400px] h-[400px] bg-gradient-to-br from-yellow-500 to-blue-600 rounded-[8rem] items-center justify-center thunder-pulse shadow-[0_0_150px_rgba(30,144,255,0.4)] rotate-12 hover:rotate-0 transition-transform duration-1000 relative">
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full opacity-50 animate-pulse" />
                <Cpu size={200} className="text-white relative z-10" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const CartDrawer = () => (
    <div className={`fixed inset-0 z-[200] ${showCart ? 'visible' : 'invisible'}`}>
      <div className={`absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-700 ${showCart ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowCart(false)} />
      <div className={`absolute top-0 ${isRtl ? 'left-0' : 'right-0'} h-full w-full sm:max-w-xl glass border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] transition-transform duration-700 transform ${showCart ? 'translate-x-0' : isRtl ? '-translate-x-full' : 'translate-x-full'} flex flex-col`}>
        <div className="p-8 md:p-12 flex justify-between items-center bg-gradient-to-r from-slate-900 to-blue-900 border-b border-white/10">
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter flex items-center gap-4 md:gap-6"><ShoppingBasket size={36} md:size={48} className="text-yellow-500" /> {t.store.checkout}</h3>
          <button onClick={() => setShowCart(false)} className="p-3 md:p-5 hover:bg-white/10 rounded-full transition-all hover:rotate-90 text-white"><X size={32} md:size={40}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 md:space-y-10 custom-scrollbar">
          {cart.length === 0 ? <p className="text-4xl md:text-5xl font-black uppercase text-center opacity-10 py-40">Empty.</p> : cart.map(item => (
            <div key={item.product.id} className="flex gap-6 md:gap-10 bg-white/5 p-6 md:p-8 rounded-2xl md:rounded-[3.5rem] border border-white/5">
              <img src={item.product.image} className="w-24 h-24 md:w-32 md:h-32 rounded-xl md:rounded-[2rem] object-cover" alt=""/>
              <div className="flex-1 space-y-2 py-2">
                <h4 className="font-black text-xl md:text-2xl text-white uppercase tracking-tighter">{item.product.title}</h4>
                <p className="text-yellow-500 font-black text-lg md:text-xl">{item.product.price * item.quantity} MAD</p>
                <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-400 p-2"><Trash2 size={20}/></button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-8 md:p-12 bg-slate-900/80 border-t border-white/10 space-y-8 md:space-y-10 text-center">
          <span className="text-5xl md:text-7xl font-black text-white">{cartTotal} MAD</span>
          <button onClick={() => {alert('Order Confirmed!'); setCart([]); setShowCart(false)}} className="w-full bg-gradient-to-r from-[#FFD700] to-[#1E90FF] py-8 md:py-10 rounded-2xl md:rounded-[3rem] text-2xl md:text-4xl font-black text-white uppercase tracking-tighter shadow-2xl thunder-pulse">Confirm Order</button>
        </div>
      </div>
    </div>
  );

  const WishlistDrawer = () => (
    <div className={`fixed inset-0 z-[200] ${showWishlist ? 'visible' : 'invisible'}`}>
      <div className={`absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-700 ${showWishlist ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowWishlist(false)} />
      <div className={`absolute top-0 ${isRtl ? 'left-0' : 'right-0'} h-full w-full sm:max-w-xl glass border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] transition-transform duration-700 transform ${showWishlist ? 'translate-x-0' : isRtl ? '-translate-x-full' : 'translate-x-full'} flex flex-col`}>
        <div className="p-8 md:p-12 flex justify-between items-center bg-gradient-to-r from-slate-900 to-red-900 border-b border-white/10">
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter flex items-center gap-4 md:gap-6"><Heart size={36} md:size={48} className="text-red-500" fill="currentColor" /> {t.store.wishlist}</h3>
          <button onClick={() => setShowWishlist(false)} className="p-3 md:p-5 hover:bg-white/10 rounded-full transition-all hover:rotate-90 text-white"><X size={32} md:size={40}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 md:space-y-10 custom-scrollbar">
          {wishlist.length === 0 ? <p className="text-4xl md:text-5xl font-black uppercase text-center opacity-10 py-40">{t.store.emptyWishlist}</p> : wishlist.map(p => (
            <div key={p.id} className="flex gap-6 md:gap-10 bg-white/5 p-6 md:p-8 rounded-2xl md:rounded-[3.5rem] border border-white/5">
              <img src={p.image} className="w-24 h-24 md:w-32 md:h-32 rounded-xl md:rounded-[2rem] object-cover" alt=""/>
              <div className="flex-1 space-y-4 py-2">
                <h4 className="font-black text-xl md:text-2xl text-white uppercase tracking-tighter">{p.title}</h4>
                <div className="flex items-center justify-between">
                  <p className="text-yellow-500 font-black text-lg md:text-xl">{p.price} MAD</p>
                  <div className="flex gap-4">
                    <button onClick={() => { toggleWishlist(p); }} className="text-red-500 hover:scale-110 transition-transform"><Trash2 size={20}/></button>
                    <button 
                      onClick={() => { addToCart(p); toggleWishlist(p); }} 
                      className="text-blue-500 hover:scale-110 transition-transform flex items-center gap-2 font-black text-[10px] md:text-sm uppercase"
                    >
                      {t.store.moveToCart} <ShoppingCart size={18} md:size={20}/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-yellow-500 selection:text-black font-sans antialiased relative overflow-x-hidden">
      <Header />
      <CartDrawer />
      <WishlistDrawer />
      <main className="min-h-screen relative z-10 pt-24">
        {currentPage === 'home' && <HomeView />}
        {currentPage === 'store' && <StoreView />}
        {currentPage !== 'home' && currentPage !== 'store' && <ServiceDetailView />}
      </main>

      <div className="fixed bottom-6 md:bottom-8 left-6 md:left-8 z-[110] flex flex-col items-center gap-4">
        {isActionMenuOpen && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
             <a href="https://wa.me/212770501853" target="_blank" rel="noreferrer" className="w-14 h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all border-4 border-white/10"><MessageCircle size={28} md:size={32}/></a>
             <a href="tel:+212770501853" className="w-14 h-14 md:w-16 md:h-16 bg-slate-700 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all border-4 border-white/10"><Phone size={28} md:size={32}/></a>
          </div>
        )}
        <button onClick={() => setIsActionMenuOpen(!isActionMenuOpen)} className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-black via-slate-900 to-yellow-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all border-2 border-yellow-500/20 thunder-pulse relative">
          {isActionMenuOpen ? <X size={28} md:size={40} className="text-yellow-500" /> : <Zap size={28} md:size={40} className="text-yellow-500 fill-yellow-500" />}
        </button>
      </div>

      {isChatOpen && (
        <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 w-[90%] md:w-[95%] max-w-[600px] h-[60vh] md:h-[800px] glass rounded-[3rem] md:rounded-[5rem] border-white/10 shadow-2xl flex flex-col z-[500] animate-in slide-in-from-bottom-40 duration-700 overflow-hidden">
          <div className="p-6 md:p-10 flex justify-between items-center bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-white/5">
            <h4 className="font-black text-xl md:text-2xl uppercase tracking-tighter text-white">GIM AI PROTOCOL</h4>
            <button onClick={() => setIsChatOpen(false)} className="p-3 md:p-4 bg-black/20 rounded-full text-white"><X size={20}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 md:space-y-10 custom-scrollbar bg-slate-950/70">
             {chatMessages.length === 0 && (
                <div className="text-center opacity-20 py-10 font-black uppercase text-2xl tracking-widest">Awaiting Signal...</div>
             )}
             {chatMessages.map((msg, i) => (
                <div key={i} className={`p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] max-w-[90%] ${msg.role === 'user' ? 'bg-blue-600 ml-auto rounded-tr-none' : 'bg-white/5 rounded-tl-none'}`}>
                   <p className="text-lg md:text-xl font-black">{msg.text}</p>
                </div>
             ))}
             {isTyping && <div className="animate-pulse text-yellow-500 font-black text-sm">GIM AI is thinking...</div>}
          </div>
          <div className="p-6 md:p-10 border-t border-white/5 bg-slate-900/90">
            <div className="flex gap-4 md:gap-6">
              <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-white/5 border border-white/10 rounded-2xl md:rounded-[2.5rem] px-6 md:px-8 py-4 md:py-5 text-white outline-none focus:border-blue-500 font-bold text-sm" placeholder="Type..." />
              <button onClick={() => handleSendMessage()} className="bg-yellow-500 p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-black hover:scale-105 transition-all active:scale-95"><Send size={24}/></button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-16 md:py-24 bg-slate-950 border-t border-white/5 relative z-10 text-right">
         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="space-y-4 md:space-y-6">
               <span className="text-2xl md:text-4xl font-black gradient-text italic">Electro GIM Services</span>
               <p className="text-gray-400 font-bold max-w-xs ml-auto text-sm md:text-base">{t.hero.desc}</p>
            </div>
            <div className="space-y-4 md:space-y-6">
               <h4 className="text-lg md:text-xl font-black uppercase text-white tracking-widest">{lang === 'ma' ? 'خدماتنا' : 'Services'}</h4>
               <ul className="space-y-3 md:space-y-4">
                  {['networks', 'websites', 'smarthome'].map(page => (
                    <li key={page}><button onClick={() => setCurrentPage(page as PageId)} className="text-gray-500 hover:text-blue-400 transition-colors font-bold uppercase text-[10px] md:text-xs">{t.nav[page as keyof typeof t.nav]}</button></li>
                  ))}
               </ul>
            </div>
            <div className="space-y-4 md:space-y-6">
               <h4 className="text-lg md:text-xl font-black uppercase text-white tracking-widest">{t.nav.contact}</h4>
               <div className="space-y-3 md:space-y-4">
                  <p className="flex items-center gap-4 text-gray-500 font-bold text-xs md:text-sm justify-end">+212 770501853 <Phone size={14} className="text-yellow-500" /></p>
                  <p className="flex items-center gap-4 text-gray-500 font-bold text-xs md:text-sm justify-end">battachhamza@gmail.com <Mail size={14} className="text-yellow-500" /></p>
               </div>
            </div>
         </div>
      </footer>

      <style>{`
        @keyframes progress {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
