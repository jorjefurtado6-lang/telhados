/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Hammer, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ChevronDown, 
  Star, 
  ArrowRight,
  Menu,
  X,
  Droplets,
  Construction,
  Layout,
  Home,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  location: string;
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: 'reparo',
    title: 'Reparo de Telhados',
    description: 'Correção de infiltrações, troca de peças danificadas e recuperação da estrutura.',
    icon: <Droplets className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/d/13ovdM8vMYumXEIZkp_nF4zhPwPhVr5fe'
  },
  {
    id: 'construcao',
    title: 'Construção de Telhados',
    description: 'Execução completa de novos telhados com foco em durabilidade e segurança.',
    icon: <Construction className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/d/1qrcqACVp3KWUjqAf4KHQfq2xr64UWNuu'
  },
  {
    id: 'manutencao',
    title: 'Manutenção de Coberturas',
    description: 'Limpeza, impermeabilização e vistorias preventivas para evitar prejuízos.',
    icon: <ShieldCheck className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/d/1vb3nBQKHxf6Zj1xgCajwx-xNMf98zwNJ'
  },
  {
    id: 'pergolados',
    title: 'Pergolados sob Medida',
    description: 'Projetos exclusivos em madeira para valorizar sua área externa com elegância.',
    icon: <Layout className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/d/1BXmZZyjArn3ZrntTZYBRPqz-gWgymnDm'
  },
  {
    id: 'decks-res',
    title: 'Decks Residenciais',
    description: 'Soluções em madeira para piscinas e jardins com acabamento impecável.',
    icon: <Home className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/d/1aEbozcVei5IOQkaxbNucxp2wQlBYg3Gc'
  },
  {
    id: 'decks-com',
    title: 'Decks Comerciais',
    description: 'Estruturas robustas e estéticas para restaurantes, bares e áreas comuns.',
    icon: <Hammer className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/d/198DrfQ8QwzIlgVx4FQFFyVEPvOa3f-ZH'
  }
];

const PROJECTS: Project[] = [
  { id: 1, title: 'Reforma Estrutural ABC', category: 'Telhados', location: 'Santo André', description: 'Troca completa de telhas e reforço de madeiramento.', image: 'https://lh3.googleusercontent.com/d/1mfBmEyRRFUkeV_9HuzVHCeWtaQHbDPe-' },
  { id: 2, title: 'Pergolado Gourmet', category: 'Pergolados', location: 'São Bernardo do Campo', description: 'Estrutura em madeira nobre com cobertura de vidro.', image: 'https://lh3.googleusercontent.com/d/12gUcQzEmlfzTZ11y_amqikudTFBoahIA' },
  { id: 3, title: 'Deck Piscina Residencial', category: 'Decks', location: 'São Caetano do Sul', description: 'Instalação de deck em madeira tratada ao redor da piscina.', image: 'https://lh3.googleusercontent.com/d/1iOZ9cBxwgw7DC_4_snOa0LntfNgJJdNs' },
  { id: 4, title: 'Reparo Urgente Infiltração', category: 'Reparos', location: 'São Bernardo do Campo', description: 'Localização e vedação de pontos críticos de vazamento.', image: 'https://lh3.googleusercontent.com/d/1J29xL0AqcFtwAB2sAu7bBlmDo9m3MaSr' },
  { id: 5, title: 'Telhado Comercial Moderno', category: 'Telhados', location: 'Diadema', description: 'Cobertura metálica com isolamento térmico.', image: 'https://lh3.googleusercontent.com/d/1j_BDpPmmgDB2I6l8ceIewXovLI2xaVwm' },
  { id: 6, title: 'Projeto Residencial', category: 'Telhados', location: 'SBC', description: 'Execução de telhado colonial.', image: 'https://lh3.googleusercontent.com/d/1yuJKDWHmDGsrRGqovoJuUmRPfq1glB2v' },
  { id: 7, title: 'Área Gourmet', category: 'Pergolados', location: 'Santo André', description: 'Pergolado com forro de bambu.', image: 'https://lh3.googleusercontent.com/d/1YWv3vuDpinH3FSZEw7OJPqlZAIzKCJbC' },
  { id: 8, title: 'Deck de Madeira', category: 'Decks', location: 'São Caetano', description: 'Deck em madeira cumaru.', image: 'https://lh3.googleusercontent.com/d/1jzwG_NtbtBUJRLS2eheGFeJNgxUfbWLx' },
  { id: 9, title: 'Manutenção Preventiva', category: 'Reparos', location: 'Diadema', description: 'Limpeza e revisão de calhas.', image: 'https://lh3.googleusercontent.com/d/1WErIe6xogvWPhSeofHWellPkG13NuV99' },
  { id: 10, title: 'Telhado Shingle', category: 'Telhados', location: 'SBC', description: 'Instalação de telha shingle.', image: 'https://lh3.googleusercontent.com/d/1EBdgDI4EJCsWbplguWFzL1FW3SDrJMxM' },
  { id: 11, title: 'Pergolado Moderno', category: 'Pergolados', location: 'Santo André', description: 'Design contemporâneo em madeira.', image: 'https://lh3.googleusercontent.com/d/1ye6gQT35SfpcUez1n_olc1QDqyuUZMm-' },
  { id: 12, title: 'Deck de Spa', category: 'Decks', location: 'São Caetano', description: 'Deck elevado para spa.', image: 'https://lh3.googleusercontent.com/d/1jvwunYfNzh6PICqquJ6k5M28MJZxTzuy' },
  { id: 13, title: 'Cobertura de Policarbonato', category: 'Telhados', location: 'Diadema', description: 'Leveza e transparência.', image: 'https://lh3.googleusercontent.com/d/1VMxzxHcwD4QSrOAgC4BXHI1ehObIlljF' },
  { id: 14, title: 'Reparo de Calhas', category: 'Reparos', location: 'SBC', description: 'Substituição de calhas e rufos.', image: 'https://lh3.googleusercontent.com/d/1wOpnE6dsb8q_-FyIeNUmBaVnmvikFkNN' },
  { id: 15, title: 'Pergolado com Vidro', category: 'Pergolados', location: 'Santo André', description: 'Proteção contra chuva com elegância.', image: 'https://lh3.googleusercontent.com/d/1z2CuROh0LyIH4JoWTCuRqUQeMyP8D_8l' },
  { id: 16, title: 'Deck de Varanda', category: 'Decks', location: 'São Caetano', description: 'Aproveitamento de espaço externo.', image: 'https://lh3.googleusercontent.com/d/1dfYHr6yUU7n62Pm6AEkp9HgXDDxGM3cq' },
  { id: 17, title: 'Telhado Termoacústico', category: 'Telhados', location: 'Diadema', description: 'Conforto térmico e acústico.', image: 'https://lh3.googleusercontent.com/d/1VsI9nnQGBohjrmnmFCghiamGyntVnV7u' },
  { id: 18, title: 'Vedação de Laje', category: 'Reparos', location: 'SBC', description: 'Impermeabilização profissional.', image: 'https://lh3.googleusercontent.com/d/1MD_GlfZ4_Vkf2DVlCigP8arpfBxUrRR5' },
  { id: 19, title: 'Pergolado Rústico', category: 'Pergolados', location: 'Santo André', description: 'Madeira bruta com charme.', image: 'https://lh3.googleusercontent.com/d/148Wx_JLVcpGEUYuYrtZuP7gI2NUsPiiZ' },
  { id: 20, title: 'Deck de Jardim', category: 'Decks', location: 'São Caetano', description: 'Integração com a natureza.', image: 'https://lh3.googleusercontent.com/d/1HalHSl11DaHnSY0GUDNVvA8o5dvZ9k8U' },
  { id: 21, title: 'Telhado de Vidro', category: 'Telhados', location: 'Diadema', description: 'Iluminação natural máxima.', image: 'https://lh3.googleusercontent.com/d/1b0v3WjUs9MOUnLC6LGK97LTgkYkl9wIq' },
  { id: 22, title: 'Troca de Telhas', category: 'Reparos', location: 'SBC', description: 'Manutenção de telhado antigo.', image: 'https://lh3.googleusercontent.com/d/1hvzfep24jpEqqmUhviIfHphpyyd2qVpA' },
  { id: 23, title: 'Pergolado de Garagem', category: 'Pergolados', location: 'Santo André', description: 'Proteção para veículos com estilo.', image: 'https://lh3.googleusercontent.com/d/1oeROHIwi0o59ExUPuWZTtSa8Bh9l64-J' },
  { id: 24, title: 'Deck de Madeira Plástica', category: 'Decks', location: 'São Caetano', description: 'Baixa manutenção e alta durabilidade.', image: 'https://lh3.googleusercontent.com/d/1hzg2KmRyzBm31sowqqnWl46Rv8fSnTan' },
  { id: 25, title: 'Cobertura Retrátil', category: 'Telhados', location: 'Diadema', description: 'Versatilidade para sua área.', image: 'https://lh3.googleusercontent.com/d/1W-sNSobvBp_eOnspI2fI0jF3b-5hj4x7' },
  { id: 26, title: 'Reparo de Infiltração', category: 'Reparos', location: 'SBC', description: 'Solução definitiva para vazamentos.', image: 'https://lh3.googleusercontent.com/d/1mCM6en-JZ4PFFkE0Tv2BX6GBQNGd6OL3' },
  { id: 27, title: 'Pergolado com Policarbonato', category: 'Pergolados', location: 'Santo André', description: 'Proteção UV e claridade.', image: 'https://lh3.googleusercontent.com/d/1DMQPfw6JB6vCWqGm0t10czKiV7U7P4KH' },
  { id: 28, title: 'Deck de Madeira Nobre', category: 'Decks', location: 'São Caetano', description: 'Acabamento de luxo.', image: 'https://lh3.googleusercontent.com/d/1BNTgsjz9XqPqTLKflqJ5EkUL8riBfWWI' },
  { id: 29, title: 'Telhado Colonial', category: 'Telhados', location: 'Diadema', description: 'Estilo clássico e resistente.', image: 'https://lh3.googleusercontent.com/d/1pE2nyrkjXjzqL8NLAkCxv09JdCbEp9ki' },
  { id: 30, title: 'Limpeza de Telhado', category: 'Reparos', location: 'SBC', description: 'Remoção de fungos e sujeira.', image: 'https://lh3.googleusercontent.com/d/1pskBYxP4FDhFsJNVDSsMi23RnHQvCyOh' },
  { id: 31, title: 'Pergolado de Madeira Tratada', category: 'Pergolados', location: 'Santo André', description: 'Durabilidade garantida.', image: 'https://lh3.googleusercontent.com/d/13me0Ql4_aPgR63SzGw54b44aVCtWM6DT' },
  { id: 32, title: 'Deck de Piscina Elevado', category: 'Decks', location: 'São Caetano', description: 'Nivelamento de terreno.', image: 'https://lh3.googleusercontent.com/d/1TdqZWi8DEbCBLVA6vN6ghZojb9IGituZ' },
  { id: 33, title: 'Telhado de Cerâmica', category: 'Telhados', location: 'Diadema', description: 'Tradição e qualidade.', image: 'https://lh3.googleusercontent.com/d/1oIW3CCVMPi8MSZNwliT4bwat7p2blCun' },
  { id: 34, title: 'Reparo de Estrutura', category: 'Reparos', location: 'SBC', description: 'Reforço de vigas e caibros.', image: 'https://lh3.googleusercontent.com/d/1IglRNrPZXlV5e86rW_9BFkeMEK_cjFq6' },
  { id: 35, title: 'Pergolado com Forro de Palha', category: 'Pergolados', location: 'Santo André', description: 'Estilo rústico e aconchegante.', image: 'https://lh3.googleusercontent.com/d/1MoynfeKWUs6KG6ykSsOLgwroTh29eIqJ' },
  { id: 36, title: 'Deck de Madeira de Demolição', category: 'Decks', location: 'São Caetano', description: 'Sustentabilidade e beleza.', image: 'https://lh3.googleusercontent.com/d/1W9d3U4dajjNtTCjPhw7wn83RIXGASxhP' },
  { id: 37, title: 'Telhado de Fibrocimento', category: 'Telhados', location: 'Diadema', description: 'Economia e rapidez.', image: 'https://lh3.googleusercontent.com/d/1sxrj26r2kkt7qTg3gYpziBI_Ip6vCgCO' },
  { id: 38, title: 'Reparo de Telhado Antigo', category: 'Reparos', location: 'SBC', description: 'Restauração completa.', image: 'https://lh3.googleusercontent.com/d/1ZXr56oowSzKhMpqhcjgHubr907Rs6hSy' }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Ricardo Oliveira',
    text: 'Atendimento nota 10. Resolveram uma infiltração que três outras empresas não conseguiram. Recomendo muito!',
    rating: 5,
    location: 'SBC'
  },
  {
    id: 2,
    name: 'Ana Paula Silva',
    text: 'O pergolado ficou maravilhoso. O acabamento é de primeira e a equipe foi muito limpa e organizada.',
    rating: 5,
    location: 'Santo André'
  },
  {
    id: 3,
    name: 'Marcos Santos',
    text: 'Preço justo e entrega no prazo. O deck da minha churrasqueira ficou exatamente como eu queria.',
    rating: 5,
    location: 'SBC'
  }
];

const FAQS = [
  {
    q: 'Vocês atendem São Bernardo do Campo?',
    a: 'Sim! Atendemos toda a cidade de São Bernardo do Campo e todas as cidades da região do ABC Paulista.'
  },
  {
    q: 'Como solicitar um orçamento?',
    a: 'Você pode clicar em qualquer botão de WhatsApp nesta página ou preencher o formulário de contato. Retornamos rapidamente.'
  },
  {
    q: 'Vocês fazem visita técnica?',
    a: 'Sim, realizamos visitas técnicas para avaliar a situação real e fornecer um orçamento preciso e sem compromisso.'
  },
  {
    q: 'Trabalham com projetos sob medida?',
    a: 'Com certeza. Especialmente para pergolados e decks, cada projeto é único e adaptado ao seu espaço e necessidade.'
  }
];

// --- Components ---

const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-slate-900'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg max-w-2xl mx-auto ${light ? 'text-slate-300' : 'text-slate-600'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const CTAButton = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick 
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'whatsapp',
  className?: string,
  onClick?: () => void
}) => {
  const baseStyles = "px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95";
  const variants = {
    primary: "bg-orange-600 text-white hover:bg-orange-700",
    secondary: "bg-white text-slate-900 hover:bg-slate-100",
    whatsapp: "bg-green-500 text-white hover:bg-green-600"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    local: '',
    servico: 'Reparo de Telhado',
    mensagem: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = PROJECTS;

  const handleWhatsApp = () => {
    window.open('https://wa.me/5513997631414?text=Olá! Gostaria de um orçamento para telhados/pergolados.', '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Novo Orçamento Solicitado*%0A%0A*Nome:* ${formData.nome}%0A*WhatsApp:* ${formData.whatsapp}%0A*Local:* ${formData.local}%0A*Serviço:* ${formData.servico}%0A*Mensagem:* ${formData.mensagem}`;
    window.open(`https://wa.me/5513997631414?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900">
      
      {/* --- Header --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={scrolled ? "https://lh3.googleusercontent.com/d/1VFmBMO73S-dunwoq_2bX7miFEakMVNuG" : "https://lh3.googleusercontent.com/d/1j-1fBeGSj6Jv3DsRWgycmZdi3qpQ5TzD"} 
              alt="Só Telhados Logo" 
              className="w-[100px] h-[100px] object-contain transition-all duration-300 mb-2"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Início', 'Serviços', 'Portfólio', 'Depoimentos', 'FAQ'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`font-medium hover:text-orange-600 transition-colors drop-shadow-sm ${scrolled ? 'text-slate-600' : 'text-white/90'}`}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={handleWhatsApp}
              className="bg-green-500 text-white px-5 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-green-600 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={scrolled ? 'text-slate-900' : 'text-white'} /> : <Menu className={scrolled ? 'text-slate-900' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                {['Início', 'Serviços', 'Portfólio', 'Depoimentos', 'FAQ'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="text-lg font-medium text-slate-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button 
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar no WhatsApp
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- Hero Section --- */}
      <section id="início" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden pb-12">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/d/1MPoVQRabe0pw2JtELglFtaJ1QHE6la53" 
            alt="Telhado de alta qualidade" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-40">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-600/30 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mt-12 mb-6 backdrop-blur-sm">
                <MapPin className="w-4 h-4" />
                Atendimento em São Bernardo e ABC
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                Precisa consertar ou construir seu <span className="text-orange-500">telhado</span>?
              </h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
                Somos especialistas em telhados, pergolados e decks. Soluções rápidas, seguras e com acabamento profissional para seu imóvel.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton onClick={handleWhatsApp} className="sm:w-auto">
                  QUERO UM ORÇAMENTO AGORA
                  <ArrowRight className="w-5 h-5" />
                </CTAButton>
                <CTAButton variant="secondary" onClick={handleWhatsApp} className="sm:w-auto">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  FALAR NO WHATSAPP
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* --- Pain Section --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1C9NYXgUZgFCR0khjP17_7rDNywdZbeMY" 
                alt="Problemas no telhado" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-8 rounded-2xl shadow-xl hidden lg:block max-w-xs">
                <p className="font-bold text-lg leading-tight">
                  "Pequenos danos hoje podem virar grandes prejuízos amanhã."
                </p>
              </div>
            </motion.div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                Seu telhado está dando sinais de problema?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-red-100 p-3 rounded-xl h-fit">
                    <Droplets className="text-red-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Goteiras e Infiltrações</h4>
                    <p className="text-slate-600">Podem trazer danos internos, mofo e comprometer a estrutura do seu imóvel.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-red-100 p-3 rounded-xl h-fit">
                    <ShieldCheck className="text-red-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Insegurança Estrutural</h4>
                    <p className="text-slate-600">Telhas soltas ou madeiramento podre oferecem riscos reais para quem habita o local.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-red-100 p-3 rounded-xl h-fit">
                    <Clock className="text-red-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Serviços Mal Executados</h4>
                    <p className="text-slate-600">O barato sai caro quando o problema volta e você precisa gastar duas vezes.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-slate-50 rounded-2xl border-l-4 border-orange-600">
                <p className="text-lg text-slate-700 italic">
                  "Se você quer resolver de forma definitiva, precisa de uma empresa que saiba avaliar, orientar e executar com qualidade."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="serviços" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Nossos Serviços Especializados" 
            subtitle="Oferecemos soluções completas para coberturas e áreas externas em São Bernardo e região."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg text-orange-600">
                    {service.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <button 
                    onClick={handleWhatsApp}
                    className="text-orange-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    solicitar orçamento
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Solution Section --- */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/10 skew-x-12 translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                A Só Telhados entrega soluções profissionais para quem não aceita improviso.
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                Cada projeto é pensado para entregar segurança, bom acabamento, durabilidade e tranquilidade para o cliente. Atuamos com foco em execução especializada.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {[
                  'Atendimento Rápido',
                  'Avaliação Profissional',
                  'Execução Especializada',
                  'Acabamento de Qualidade',
                  'Soluções Sob Medida',
                  'Foco em Segurança'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="bg-orange-600 rounded-full p-1">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <CTAButton onClick={handleWhatsApp}>
                QUERO FALAR COM UM ESPECIALISTA
              </CTAButton>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://lh3.googleusercontent.com/d/14M-4XUmMVx4A0PyHIltpoyp0uhn5tNyC" alt="Detalhe telhado" className="rounded-2xl mt-12" referrerPolicy="no-referrer" />
                <img src="https://lh3.googleusercontent.com/d/129h2paZov1gW7yNVGAoa2kwqtE03YinJ" alt="Detalhe deck" className="rounded-2xl" referrerPolicy="no-referrer" />
              </div>
              {/* Floating Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-slate-900 p-6 rounded-3xl shadow-2xl text-center min-w-[200px]">
                <p className="text-4xl font-black text-orange-600 mb-1">100%</p>
                <p className="text-sm font-bold uppercase tracking-wider">Satisfação Garantida</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Portfolio Section --- */}
      <section id="portfólio" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Projetos Realizados" 
            subtitle="Veja alguns dos serviços executados pela Só Telhados em telhados, pergolados e decks."
          />

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="break-inside-avoid group relative rounded-3xl overflow-hidden shadow-lg mb-8"
                >
                  <img 
                    src={project.image} 
                    alt="Projeto Realizado" 
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <button 
                      onClick={handleWhatsApp}
                      className="bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                    >
                      Solicitar orçamento
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section id="depoimentos" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Quem contrata, recomenda" 
            subtitle="Clientes que buscavam segurança, bom acabamento e agilidade encontraram na Só Telhados uma solução confiável."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <motion.div 
                key={t.id}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg mb-8 leading-relaxed italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold">{t.name}</h5>
                    <p className="text-sm text-slate-500">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Urgency Section --- */}
      <section className="py-24 bg-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 max-w-4xl mx-auto leading-tight">
            Não espere o problema aumentar. Proteja seu imóvel hoje mesmo!
          </h2>
          <p className="text-xl text-orange-100 mb-12 max-w-2xl mx-auto">
            Se o seu telhado precisa de reparo, ou se você quer tirar do papel um projeto de pergolado ou deck, fale agora com nossa equipe.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CTAButton variant="secondary" onClick={handleWhatsApp} className="text-orange-600">
              QUERO ATENDIMENTO AGORA
            </CTAButton>
            <CTAButton variant="whatsapp" onClick={handleWhatsApp}>
              PEDIR ORÇAMENTO NO WHATSAPP
            </CTAButton>
          </div>
        </div>
      </section>

      {/* --- Form Section --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Solicite uma Visita Técnica</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Preencha o formulário e nossa equipe entrará em contato para agendar uma avaliação profissional no seu imóvel.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-orange-500 w-5 h-5" />
                  <span>(13) 99763-1414</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-orange-500 w-5 h-5" />
                  <span>São Bernardo do Campo e ABC Paulista</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-white p-12">
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nome Completo</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 outline-none transition-all" 
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">WhatsApp</label>
                  <input 
                    type="tel" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 outline-none transition-all" 
                    placeholder="(13) 99763-1414"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Cidade / Bairro</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 outline-none transition-all" 
                    placeholder="Ex: SBC - Centro"
                    value={formData.local}
                    onChange={(e) => setFormData({...formData, local: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tipo de Serviço</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 outline-none transition-all bg-white"
                    value={formData.servico}
                    onChange={(e) => setFormData({...formData, servico: e.target.value})}
                  >
                    <option>Reparo de Telhado</option>
                    <option>Construção de Telhado</option>
                    <option>Pergolado</option>
                    <option>Deck de Madeira</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Mensagem (Opcional)</label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 outline-none transition-all h-24 resize-none" 
                    placeholder="Conte-nos um pouco sobre sua necessidade"
                    value={formData.mensagem}
                    onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-all shadow-lg">
                  SOLICITAR ORÇAMENTO
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle title="Dúvidas Frequentes" />
          
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h4 className="text-lg font-bold pr-4">{faq.q}</h4>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img 
                  src="https://lh3.googleusercontent.com/d/1j-1fBeGSj6Jv3DsRWgycmZdi3qpQ5TzD" 
                  alt="Só Telhados Logo" 
                  className="h-16 w-auto object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed mb-6">
                Especialistas em soluções profissionais para coberturas e áreas externas. Atendimento de excelência em São Bernardo do Campo e todo o ABC Paulista.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/sotelhados/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-bold mb-6">Serviços</h5>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Reparo de Telhados</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Construção de Telhados</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Pergolados sob Medida</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Decks de Madeira</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-bold mb-6">Contato</h5>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  (13) 99763-1414
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-orange-500" />
                  WhatsApp Comercial
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  São Bernardo do Campo, SP
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2026 Só Telhados. Todos os direitos reservados. Desenvolvido por <a href="https://nandosilvadev.site" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Nando Silva</a>.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Floating WhatsApp Button --- */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsApp}
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl font-bold text-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Falar com Especialista
        </span>
      </motion.button>

    </div>
  );
}
