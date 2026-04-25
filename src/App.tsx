/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flashlight, 
  Settings, 
  Construction, 
  Zap, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  BadgeCheck, 
  BadgeDollarSign,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Mail,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SERVICES = [
  {
    title: "Home & Office Wiring",
    icon: Construction,
    description: "Complete electrical planning and wiring solutions for modern spaces."
  },
  {
    title: "AC & Appliance Repair",
    icon: Settings,
    description: "Expert servicing for cooling systems and electrical household appliances."
  },
  {
    title: "Short Circuit Troubleshooting",
    icon: Flashlight,
    description: "Rapid mapping and fixing of faulty electrical connections and surges."
  },
  {
    title: "Industrial Maintenance",
    icon: Zap,
    description: "Heavy-duty electrical support for factories and large-scale industries."
  }
];

const BENEFITS = [
  {
    title: "Safety-First Approach",
    icon: ShieldCheck,
    description: "We prioritize international safety standards in every installation."
  },
  {
    title: "Certified Technicians",
    icon: BadgeCheck,
    description: "Our team consists of government-certified elite electricians."
  },
  {
    title: "Transparent Pricing",
    icon: BadgeDollarSign,
    description: "No hidden fees. Upfront quotes for all residential and commercial jobs."
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      serviceType: formData.get('serviceType'),
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormState('success');
        setStatusMessage(result.message || 'Thank you! We will contact you shortly.');
      } else {
        setFormState('error');
        setStatusMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setFormState('error');
      setStatusMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="text-primary w-8 h-8 fill-primary" />
            <span className="text-2xl font-black tracking-tighter uppercase italic">Electrical Solution</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Services</a>
            <a href="#why-us" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Why Us</a>
            <a href="#contact" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="default" className="rounded-full font-black uppercase tracking-tighter px-6 hidden sm:flex" asChild>
              <a href="tel:+8801718417207">Call Now</a>
            </Button>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <a href="#services" className="text-4xl font-black uppercase italic" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#why-us" className="text-4xl font-black uppercase italic" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
            <a href="#contact" className="text-4xl font-black uppercase italic" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <Button size="lg" className="rounded-full px-12" asChild>
              <a href="tel:+8801718417207">Call Support</a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero */}
        <section className="relative pt-40 pb-20 md:pt-64 md:pb-40 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 -z-10" />
          
          <div className="container mx-auto px-4">
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-6xl md:text-9xl font-black leading-[0.8] mb-8">
                  Expert Electrical <br />
                  <span className="text-primary italic">Solutions</span> at your door
                </h1>
                
                <div className="flex flex-col md:flex-row md:items-end gap-8">
                  <div className="border-l-4 border-primary pl-6 py-2 max-w-sm">
                    <p className="text-xl font-bold uppercase tracking-tight text-muted-foreground leading-tight">
                      Providing 24/7 emergency support across <span className="text-foreground">Mohammadpur</span>.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="rounded-full px-8 h-16 text-lg font-black uppercase tracking-tighter shadow-2xl shadow-primary/20" asChild>
                      <a href="#contact">Request Service Now</a>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 h-16 text-lg font-black uppercase tracking-tighter border-2" asChild>
                      <a href="tel:+8801718417207">Emergency Support</a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 p-8 hidden lg:block">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center"
             >
                <div className="w-3/4 h-3/4 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center">
                  <Zap className="text-primary w-8 h-8 fill-primary" />
                </div>
             </motion.div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <h2 className="text-5xl md:text-7xl font-black leading-[0.85] mb-4">Core <br /><span className="text-primary italic">Services</span></h2>
                <p className="text-muted-foreground uppercase tracking-widest font-bold">What we bring to the table</p>
              </div>
              <Button variant="link" className="text-primary p-0 h-auto font-black uppercase tracking-widest flex items-center gap-2 group">
                View All Services <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="glass-card h-full rounded-none brutal-border hover:-translate-y-2 transition-transform duration-300">
                    <CardHeader>
                      <service.icon className="text-primary w-12 h-12 mb-4" />
                      <CardTitle className="text-2xl font-black leading-tight text-white">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-400 font-medium">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section id="why-us" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-square bg-primary/10 rounded-3xl overflow-hidden brutal-border border-4">
                  <img 
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1469&auto=format&fit=crop" 
                    alt="Service Professional" 
                    className="w-full h-full object-cover grayscale brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
                
                <motion.div 
                  initial={{ rotate: -10, scale: 0.8 }}
                  whileInView={{ rotate: 12, scale: 1 }}
                  className="absolute top-10 -right-10 bg-primary text-primary-foreground p-6 rounded-2xl shadow-2xl z-10 hidden sm:block"
                >
                   <p className="text-4xl font-black leading-none">10+</p>
                   <p className="uppercase font-bold tracking-tighter text-sm">Years <br /> Experience</p>
                </motion.div>
              </div>

              <div>
                <h2 className="text-5xl md:text-7xl font-black leading-[0.85] mb-12">Safety <br /><span className="text-primary italic">Priority</span></h2>
                
                <div className="space-y-8">
                  {BENEFITS.map((benefit, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="flex gap-6"
                    >
                      <div className="shrink-0 w-16 h-16 rounded-full bg-secondary flex items-center justify-center border-2 border-primary">
                        <benefit.icon className="text-primary w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black mb-1">{benefit.title}</h3>
                        <p className="text-slate-400 font-medium">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / Lead Form */}
        <section id="contact" className="py-24 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-5 gap-16">
              <div className="lg:col-span-2">
                <h2 className="text-5xl md:text-8xl font-black leading-[0.8] mb-8">Work <br />Together</h2>
                <p className="text-xl text-slate-400 font-bold mb-12">
                  Have an electrical emergency or project? Send us your details and we'll get back to you within 30 minutes!
                </p>

                <div className="space-y-6">
                   <a href="https://wa.me/8801718417207" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs uppercase font-black text-primary">WhatsApp / Call</p>
                        <p className="text-2xl font-black">+880 1718 417207</p>
                      </div>
                   </a>
                   <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs uppercase font-black text-primary">Location</p>
                        <p className="text-2xl font-black leading-tight">Mohammadpur, <br /> Dhaka - 1207</p>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4 mt-12">
                   {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                     <a key={idx} href="#" className="p-4 bg-secondary rounded-full border border-white/10 hover:border-primary transition-colors">
                       <Icon className="w-5 h-5" />
                     </a>
                   ))}
                </div>
              </div>

              <div className="lg:col-span-3">
                 <Card className="glass-card brutal-border p-8 md:p-12">
                    {formState === 'success' ? (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-20"
                      >
                         <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                            <BadgeCheck className="text-primary w-16 h-16" />
                         </div>
                         <h3 className="text-4xl font-black mb-4">Request Sent!</h3>
                         <p className="text-xl text-slate-400 font-bold mb-8">{statusMessage}</p>
                         <Button onClick={() => setFormState('idle')} className="rounded-full">Send Another Request</Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <Label className="uppercase font-black tracking-widest text-xs">Full Name</Label>
                             <Input name="firstName" required className="h-14 bg-background/50 brutal-border border-white/10" placeholder="E.g. Tanvir Ahmed" />
                          </div>
                          <div className="space-y-2">
                             <Label className="uppercase font-black tracking-widest text-xs">Phone Number</Label>
                             <Input name="phone" required className="h-14 bg-background/50 brutal-border border-white/10" placeholder="+880 1XXX XXXXXX" />
                          </div>
                        </div>

                        <div className="space-y-2">
                           <Label className="uppercase font-black tracking-widest text-xs">Email Address</Label>
                           <Input name="email" type="email" required className="h-14 bg-background/50 brutal-border border-white/10" placeholder="tanvir@example.com" />
                        </div>

                        <div className="space-y-2">
                           <Label className="uppercase font-black tracking-widest text-xs">Service Category</Label>
                           <Select name="serviceType" required>
                              <SelectTrigger className="h-14 bg-background/50 brutal-border border-white/10">
                                <SelectValue placeholder="Select Service" />
                              </SelectTrigger>
                              <SelectContent>
                                {SERVICES.map((s, idx) => (
                                  <SelectItem key={idx} value={s.title}>{s.title}</SelectItem>
                                ))}
                              </SelectContent>
                           </Select>
                        </div>

                        <Button 
                          type="submit" 
                          size="lg" 
                          disabled={formState === 'submitting'}
                          className="w-full h-16 text-xl font-black uppercase tracking-tighter rounded-full shadow-xl shadow-primary/20"
                        >
                          {formState === 'submitting' ? 'Submitting...' : 'Request Inspection Now'}
                        </Button>
                        
                        {formState === 'error' && (
                          <p className="text-destructive font-bold text-center mt-4">{statusMessage}</p>
                        )}
                      </form>
                    )}
                 </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4 flex flex-col md:row items-center justify-between gap-8">
           <div className="flex items-center gap-2">
              <Zap className="text-primary w-6 h-6 fill-primary" />
              <span className="text-xl font-black uppercase italic">Electrical Solution</span>
           </div>
           
           <div className="flex gap-8">
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Emergency</a>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Residential</a>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Commercial</a>
           </div>

           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-700">
             © 2024 Electrical Solution. All Rights Reserved.
           </p>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a 
        href="https://wa.me/8801718417207" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-black/50 hover:scale-110 active:scale-95 transition-transform"
      >
        <MessageCircle className="w-8 h-8 fill-white text-[#25D366]" />
      </a>
    </div>
  );
}
