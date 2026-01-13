import React, { useState, useEffect } from "react";
import {
  Shield,
  PhoneCall,
  LocateFixed,
  ChevronUp,
  FileCheck,
  User,
  PlayCircle,
  BarChart3,
  AlertTriangle,
  Package,
  Users,
  Calendar,
  Video,
  MapPin,
  Camera,
  CheckCircle,
  XCircle,
  ChevronRight,
  Bell,
  Search,
  Dog,
  FileText,
  LogOut,
  ArrowLeft,
  Activity,
  Lock,
  Eye,
  EyeOff,
  Key,
  ChevronDown,
  Send,
  QrCode,
  UserPlus,
  Clock,
  CalendarCheck,
  Truck,
  HardHat,
  FileBarChart,
  Building,
  Bike,
  ScanLine,
  Zap,
  FileSpreadsheet,
  Filter,
  MessageSquare,
  Siren,
  CheckSquare,
  Radio,
  Flame,
  Megaphone,
  Skull,
  Biohazard,
  Bomb,
  Hammer,
  Wind,
  Move,
  AlertOctagon,
  Info,
  ClipboardList,
  Box,
  Save,
  RadioReceiver,
  Plus,
  ListTodo,
  Trash2,
  Edit,
  PlusCircle,
  X,
  Navigation,
  Crosshair,
  ChevronLeft,
} from "lucide-react";

// --- ESTILOS GLOBALES ---
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
    @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); } 70% { box-shadow: 0 0 0 20px rgba(220, 38, 38, 0); } 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); } }
    @keyframes pulse-orange { 0% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.7); } 70% { box-shadow: 0 0 0 20px rgba(234, 88, 12, 0); } 100% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0); } }
    @keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
    @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
    .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
    .animate-pulse-red { animation: pulse-red 1.5s infinite; }
    .animate-pulse-orange { animation: pulse-orange 2s infinite; }
    .animate-scan { animation: scan 2s linear infinite; }
    .animate-ping-slow { animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  `}</style>
);

// --- CONSTANTES Y BASES DE DATOS ---
const CREDENTIALS = {
  guard: { user: "Guardia", pass: "1234", name: "Oficial Roberts" },
  resident: { user: "Prop.", pass: "1234", name: "Familia Pérez" },
  localAdmin: { user: "AdminLocal", pass: "1234", name: "Gerencia Los Robles" },
  admin: { user: "Admin", pass: "1234", name: "Super Admin Global" },
};

// COORDENADAS SIMULADAS DEL BARRIO (Mapa 100x100 grid)
const MOCK_COORDINATES = {
  "UF 402": { x: 65, y: 30 },
  "UF 105": { x: 20, y: 80 },
  "Club House": { x: 50, y: 50 },
  "Acceso Norte": { x: 10, y: 10 },
};

let TASKS_DB = [
  {
    id: 1,
    title: "Revisar Sensor Perímetro Norte",
    description:
      "El sensor 4 dió falsa alarma anoche. Verificar estado físico.",
    priority: "high",
    status: "pending",
    author: "Supervisor General",
    date: "Hoy, 08:00",
  },
  {
    id: 2,
    title: "Entregar llaves a Mantenimiento",
    description:
      "La empresa de piscinas viene a las 14:00hs. Entregar llaves sala máquinas.",
    priority: "normal",
    status: "pending",
    author: "Admin Local",
    date: "Hoy, 09:30",
  },
  {
    id: 3,
    title: "Ronda nocturna incompleta",
    description: "Quedó pendiente sector Oeste por lluvia. Reforzar hoy.",
    priority: "low",
    status: "pending",
    author: "Guardia Turno Noche",
    date: "Ayer, 23:45",
  },
];

const EMERGENCY_DATA = {
  intrusion: {
    label: "INTRUSIÓN",
    color: "orange",
    icon: "Footprints",
    call911: true,
    steps: [
      "Activar control de accesos: bloquear ingreso/salida del sector afectado.",
      "Verificar cámaras perimetrales y registrar hora y ubicación.",
      "Enviar móvil/patrulla al punto manteniendo distancia segura.",
      "Avisar a administración y coordinar apoyo interno.",
      "Evitar confrontación directa; priorizar observación y contención.",
      "Indicar a residentes cercanos que permanezcan dentro y cierren accesos.",
      "Preservar evidencia: no manipular objetos, no borrar grabaciones.",
      "Si se confirma presencia o riesgo, llamar al 911 y seguir instrucciones.",
      "Documentar: descripción, vestimenta, dirección de desplazamiento.",
    ],
  },

  robo: {
    label: "ROBO",
    color: "orange",
    icon: "Skull",
    call911: true,
    steps: [
      "Evaluar seguridad: no exponerse ni confrontar.",
      "Asistir a la víctima si es seguro y solicitar apoyo médico si aplica.",
      "Implementar cierre controlado de accesos según protocolo interno.",
      "Confirmar ubicación exacta, descripción del hecho y sospechosos.",
      "Preservar cámaras y registros: marcar intervalo horario y accesos.",
      "Mantener comunicación con administración (un canal único).",
      "Aislar la zona del incidente para evitar contaminación de evidencia.",
      "Llamar al 911 si el hecho está en curso o hay riesgo inmediato.",
      "Registrar testimonios básicos y datos de contacto de la víctima.",
    ],
  },

  sismo: {
    label: "SISMO",
    color: "orange",
    icon: "Activity",
    call911: false,
    steps: [
      "Verificar estado general del barrio y puntos críticos (garitas, portones).",
      "Revisar visualmente daños estructurales evidentes sin ingresar a zonas inseguras.",
      "Cortar suministro de gas en caso de olor/ruptura visible (si corresponde).",
      "Asegurar accesos para servicios de emergencia (portones operativos).",
      "Indicar a residentes evitar ascensores y zonas con mampostería dañada.",
      "Señalizar áreas peligrosas y restringir circulación.",
      "Coordinar con administración inspección técnica posterior.",
      "Registrar reportes de daños y lesionados (si existieran).",
    ],
  },

  fallas: {
    label: "FALLAS ESTRUCT.",
    color: "orange",
    icon: "Hammer",
    call911: true,
    steps: [
      "Aislar el área: delimitar perímetro y evitar tránsito.",
      "Evacuar unidades colindantes si hay riesgo de desprendimiento.",
      "Cortar servicios del sector si es necesario (gas/energía/agua) coordinando con administración.",
      "Verificar si hay heridos y solicitar asistencia médica si corresponde.",
      "No permitir ingreso al área dañada hasta evaluación técnica.",
      "Registrar imágenes/ubicación y hora del hallazgo.",
      "Coordinar con Defensa Civil/Bomberos según gravedad.",
      "Llamar al 911 si hay riesgo inmediato o heridos.",
      "Mantener guardia en perímetro hasta relevo.",
    ],
  },

  gas: {
    label: "FUGA DE GAS",
    color: "orange",
    icon: "Wind",
    call911: true,
    steps: [
      "No accionar interruptores eléctricos ni generar chispas en el área.",
      "Evacuar el perímetro inmediato y ventilar si es posible sin riesgo.",
      "Cortar el suministro desde llave general si está accesible y seguro.",
      "Restringir el tránsito vehicular y peatonal cercano.",
      "Notificar a administración y coordinar comunicación a residentes.",
      "Identificar origen aproximado (sin exposición).",
      "Llamar al 911 si hay fuerte olor, síntomas o riesgo de explosión.",
      "Contactar a la distribuidora (ECOGAS) según protocolo.",
      "Registrar hora, unidad/sector y acciones realizadas.",
    ],
  },

  incendio: {
    label: "INCENDIO",
    color: "red",
    icon: "Flame",
    call911: true,
    steps: [
      "Confirmar ubicación exacta (unidad/sector) y tipo de fuego/humo.",
      "Ordenar evacuación del área afectada y mantener rutas libres.",
      "Asegurar acceso para bomberos (portones/ingresos despejados).",
      "Cortar energía/gas del sector si está indicado y es seguro.",
      "Utilizar extintor solo si el fuego es incipiente y hay salida segura.",
      "Evitar inhalación de humo; priorizar resguardo de personas.",
      "Llamar al 911 inmediatamente e informar: ubicación, magnitud y accesos.",
      "Coordinar punto de encuentro y conteo básico de personas.",
      "Preservar perímetro y registrar tiempos del evento.",
    ],
  },

  bomba: {
    label: "AMENAZA BOMBA",
    color: "red",
    icon: "Bomb",
    call911: true,
    steps: [
      "No manipular paquetes/objetos sospechosos ni acercarse innecesariamente.",
      "Aislar perímetro seguro (según ubicación y riesgo).",
      "Evitar pánico: dar instrucciones claras y breves.",
      "Evacuar por rutas alejadas del objeto y evitar aglomeraciones.",
      "No utilizar dispositivos de comunicación cerca del objeto si hay sospecha concreta.",
      "Coordinar accesos para fuerzas de seguridad.",
      "Llamar al 911 y solicitar brigada especializada.",
      "Registrar descripción del objeto y ubicación exacta.",
      "Mantener control de accesos hasta arribo de autoridades.",
    ],
  },

  quimico: {
    label: "SUST. PELIGROSAS",
    color: "red",
    icon: "Biohazard",
    call911: true,
    steps: [
      "Identificar zona y evitar contacto con la sustancia.",
      "Evacuar a favor de rutas seguras (alejándose de vapores).",
      "Aislar el área y restringir circulación.",
      "Notificar a administración y coordinar aviso interno.",
      "No intentar limpieza sin equipo y capacitación.",
      "Si hay exposición, solicitar asistencia médica inmediata.",
      "Llamar al 911 si hay riesgo para personas o fuga activa.",
      "Registrar recipiente/etiquetas visibles a distancia.",
      "Esperar brigada especializada y seguir instrucciones.",
    ],
  },

  tirador: {
    label: "TIRADOR ACTIVO",
    color: "red",
    icon: "Crosshair",
    call911: true,
    steps: [
      "Activar LOCKDOWN: cerrar accesos del barrio y restringir circulación interna.",
      "Indicar a residentes resguardo inmediato dentro de viviendas (puertas cerradas).",
      "Evitar confrontación; mantener distancia y cobertura.",
      "Confirmar ubicación y dirección de desplazamiento si es posible sin riesgo.",
      "Coordinar un solo canal de comunicación interno con administración.",
      "Asegurar rutas de ingreso para fuerzas de seguridad.",
      "Llamar al 911 de inmediato y mantener línea para actualizaciones.",
      "No difundir información no verificada para evitar pánico.",
      "Registrar tiempos, ubicaciones y testimonios cuando sea seguro.",
    ],
  },
};

const RESIDENTS_DB = [
  { id: 1, name: "Juan Pérez", unit: "UF 402", status: "Active" },
  { id: 2, name: "María Gonzalez", unit: "UF 105", status: "Active" },
  { id: 3, name: "Roberto Carlos", unit: "UF 303", status: "Active" },
  { id: 4, name: "Ana Bolena", unit: "UF 201", status: "Debtor" },
  {
    id: 5,
    name: "Empresa Tech Soluciones",
    unit: "Oficina 12",
    status: "Active",
  },
  { id: 6, name: "Carlos Ruiz", unit: "UF 505", status: "Active" },
];

const SUPPLIERS_DB = [
  {
    dni: "20123456",
    name: "Mario Gas",
    company: "Ecogas",
    category: "Servicios",
    serviceType: "Gas",
    plate: "AB 123 CD",
    visits: 12,
  },
  {
    dni: "30987654",
    name: "José Electricidad",
    company: "Electricidad Mendoza",
    category: "Servicios",
    serviceType: "Electricista",
    plate: "AD 999 XX",
    visits: 5,
  },
  {
    dni: "40555666",
    name: "Logística Andreani",
    company: "Andreani",
    category: "Delivery",
    serviceType: "",
    plate: "AA 000 BB",
    visits: 45,
  },
];

const AUTHORIZED_VISITS_DB = [
  {
    id: 101,
    visitor: "Esteban Quito",
    dni: "20.123.456",
    host: "Juan Pérez (UF 402)",
    plate: "AE 123 ZZ",
    occupants: 2,
    date: "2023-10-25",
    time: "10:30",
    status: "Ingresó",
  },
  {
    id: 102,
    visitor: "Laura Vicuña",
    dni: "30.987.654",
    host: "María Gonzalez (UF 105)",
    plate: "AB 456 CC",
    occupants: 1,
    date: "2023-10-25",
    time: "11:15",
    status: "Ingresó",
  },
  {
    id: 103,
    visitor: "Pedro Pascal",
    dni: "99.888.777",
    host: "Carlos Ruiz (UF 505)",
    plate: "--",
    occupants: 1,
    date: "2023-10-26",
    time: "--",
    status: "Pendiente",
  },
];

const AMENITIES_BASE_SLOTS = [
  { id: 1, time: "10:00 - 14:00" },
  { id: 2, time: "14:00 - 18:00" },
  { id: 3, time: "18:00 - 22:00" },
  { id: 4, time: "22:00 - 02:00" },
];
let RESERVATIONS_DB = {
  "2026-01-15": [2],
  "2026-01-20": [1, 2],
};

const INCIDENTS_DB = [
  {
    id: 1,
    type: "Ruidos Molestos",
    detail: "Música alta fuera de horario",
    location: "UF 402",
    time: "02:30 AM",
    status: "Resuelto",
    severity: "low",
    date: "2023-10-24",
  },
  {
    id: 2,
    type: "Portón Trabado",
    detail: "Acceso secundario no cierra",
    location: "Acceso Norte",
    time: "08:15 AM",
    status: "Abierto",
    severity: "high",
    date: "2023-10-25",
  },
  {
    id: 3,
    type: "Mascota Suelta",
    detail: "Perro raza grande sin correa",
    location: "Plaza Juegos",
    time: "10:00 AM",
    status: "Resuelto",
    severity: "medium",
    date: "2023-10-25",
  },
];

const PACKAGE_TYPES = [
  "Paquete",
  "Impuestos",
  "Documentación",
  "Cartas",
  "Judiciales",
  "Otro",
];
const SERVICE_TYPES = [
  "Internet",
  "Telefonía",
  "Gas",
  "Plomero",
  "Electricista",
  "Aire Acondicionado",
  "Calefacción",
  "Limpieza",
  "Jardinería",
  "Sistemas Electrónicos",
  "Otro",
];
const DELIVERY_PLATFORMS = [
  "Pedidos Ya",
  "Uber Eats",
  "Rappi",
  "Cabify",
  "Uber",
  "Otro",
];

const ROUND_POINTS_DATA = [
  {
    id: 1,
    name: "Garita Principal",
    pos: { x: 10, y: 10 },
    status: "pending",
    time: null,
  },
  {
    id: 2,
    name: "Ingreso Vehicular",
    pos: { x: 30, y: 20 },
    status: "pending",
    time: null,
  },
  {
    id: 3,
    name: "Perímetro Norte",
    pos: { x: 60, y: 35 },
    status: "pending",
    time: null,
  },
  {
    id: 4,
    name: "SUM / Amenities",
    pos: { x: 80, y: 60 },
    status: "pending",
    time: null,
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 998,
    type: "info",
    title: "Bienvenido",
    message: "Bienvenido a Blindaje Digital App. Aquí recibirás tus alertas.",
    date: "Hoy, 08:00",
    read: true,
    priority: "low",
  },
  {
    id: 999,
    type: "amenity",
    title: "Reserva Confirmada",
    message: "Tu reserva del SUM para el sábado ha sido aprobada.",
    date: "Ayer, 14:30",
    read: true,
    priority: "normal",
  },
];

// --- HELPER ICONS ---
const getIcon = (name, size, className) => {
  switch (name) {
    case "Footprints":
      return <AlertOctagon size={size} className={className} />;
    case "Skull":
      return <Skull size={size} className={className} />;
    case "Activity":
      return <Activity size={size} className={className} />;
    case "Hammer":
      return <Hammer size={size} className={className} />;
    case "Wind":
      return <Wind size={size} className={className} />;
    case "Flame":
      return <Flame size={size} className={className} />;
    case "Bomb":
      return <Bomb size={size} className={className} />;
    case "Biohazard":
      return <Biohazard size={size} className={className} />;
    case "Crosshair":
      return <ScanLine size={size} className={className} />;
    default:
      return <AlertTriangle size={size} className={className} />;
  }
};

// --- UI COMPONENTS ---

const Toast = ({ message, onClose, type = "success" }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: "bg-slate-800 border-l-4 border-emerald-500",
    error: "bg-slate-800 border-l-4 border-red-500",
    info: "bg-slate-800 border-l-4 border-blue-500",
    warning: "bg-slate-800 border-l-4 border-orange-500",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-[9999] ${bgColors[type]} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[300px] animate-fade-in-up`}
    >
      <div className="flex-1">
        <h4 className="font-bold text-sm uppercase tracking-wider mb-1">
          {type === "error" ? "Alerta" : "Notificación"}
        </h4>
        <p className="text-sm font-medium text-slate-300 whitespace-pre-line">
          {message}
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors"
      >
        <XCircle size={20} />
      </button>
    </div>
  );
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  size = "md",
  disabled = false,
}) => {
  const baseStyle =
    "font-bold rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";
  const variants = {
    primary:
      "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-200 border border-orange-700",
    secondary:
      "bg-slate-700 text-white hover:bg-slate-800 border border-slate-800",
    outline:
      "bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-red-200",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200",
    ghost: "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
    black: "bg-slate-900 text-white hover:bg-black shadow-lg",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  return (
    <button
      type={onClick ? "button" : "submit"} // o pasar type por props
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const BrandLogo = ({ className = "text-2xl", light = false }) => (
  <div
    className={`font-sans font-black tracking-tighter flex items-center gap-2 ${className}`}
  >
    <div className="relative">
      <Shield className="fill-orange-600 text-orange-600" size={32} />
      <div className="absolute inset-0 flex items-center justify-center">
        <Lock size={14} className="text-white" strokeWidth={3} />
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <span className={light ? "text-white" : "text-slate-800"}>BLINDAJE</span>
      <span
        className={`text-[10px] font-bold tracking-[0.2em] ${
          light ? "text-slate-300" : "text-orange-600"
        }`}
      >
        SEGURIDAD
      </span>
    </div>
  </div>
);

const SimpleCalendar = ({ selectedDate, onDateSelect, bookedDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10"></div>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(i).padStart(2, "0")}`;
    const isSelected = selectedDate === dateStr;
    const isBooked = bookedDates[dateStr] && bookedDates[dateStr].length >= 4;
    days.push(
      <button
        key={i}
        onClick={() => onDateSelect(dateStr)}
        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all mx-auto ${
          isSelected
            ? "bg-orange-600 text-white shadow-lg scale-110"
            : isBooked
            ? "bg-red-100 text-red-400 cursor-not-allowed"
            : "hover:bg-slate-100 text-slate-700"
        }`}
        disabled={isBooked}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} className="p-1 hover:bg-slate-100 rounded">
          <ChevronLeft size={20} />
        </button>
        <span className="font-black text-slate-800 uppercase">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button onClick={handleNext} className="p-1 hover:bg-slate-100 rounded">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["D", "L", "M", "M", "J", "V", "S"].map((d) => (
          <span key={d} className="text-xs font-bold text-slate-400">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-2">{days}</div>
    </div>
  );
};

const ResidentSelector = ({ onSelect, selected }) => {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const filtered = RESIDENTS_DB.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.unit.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-2 relative">
      <label className="text-xs font-black uppercase tracking-wider text-slate-600">
        Visita a (Unidad/Residente)
      </label>
      {!selected ? (
        <div className="relative">
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
            }}
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-900 focus:border-orange-500 focus:bg-white outline-none transition-all font-medium"
            placeholder="Buscar por Nombre o Unidad..."
          />
          {showResults && search.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-lg shadow-xl mt-1 z-50 max-h-60 overflow-y-auto">
              {filtered.map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    onSelect(r);
                    setSearch("");
                    setShowResults(false);
                  }}
                  className="p-3 hover:bg-orange-50 cursor-pointer border-b border-slate-50 last:border-0"
                >
                  <p className="font-bold text-slate-800">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.unit}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-200 p-2 rounded-full text-emerald-700">
              <User size={20} />
            </div>
            <div>
              <p className="font-bold text-emerald-900">{selected.name}</p>
              <p className="text-xs text-emerald-600 font-bold">
                {selected.unit}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelect(null)}
            className="text-slate-400 hover:text-red-500"
          >
            <XCircle size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

// --- COMPONENTE MAPA TÁCTICO (NUEVO) ---
const LocationMap = ({ location }) => {
  // Si no hay ubicación específica, mostrar centro genérico
  const x = location ? location.x : 50;
  const y = location ? location.y : 50;

  return (
    <div className="relative w-full h-64 bg-slate-800 rounded-xl overflow-hidden border-2 border-slate-600 shadow-inner group">
      {/* Imagen de fondo simulando mapa o grilla táctica */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #64748b 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* Elementos simulados del mapa */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-slate-600 rounded opacity-30"></div>
      <div className="absolute top-10 left-10 text-[10px] text-slate-500 font-mono">
        SECTOR NORTE
      </div>
      <div className="absolute bottom-10 right-10 text-[10px] text-slate-500 font-mono">
        SECTOR SUR
      </div>

      {/* PIN DE UBICACIÓN */}
      {location && (
        <div
          className="absolute flex flex-col items-center justify-center transition-all duration-1000 ease-in-out"
          style={{
            top: `${y}%`,
            left: `${x}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping-slow opacity-75"></div>
            <div className="relative bg-red-600 text-white p-2 rounded-full shadow-lg border-2 border-white z-10">
              <MapPin size={24} fill="currentColor" />
            </div>
          </div>
          <div className="mt-2 bg-black/75 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider backdrop-blur-sm">
            OBJETIVO
          </div>
        </div>
      )}

      {/* Overlay de "Escaneando" */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-[10%] w-full animate-scan"></div>
    </div>
  );
};

// --- MÓDULO DE GESTIÓN DE RESIDENTES (ADMIN) ---
const ResidentManagementScreen = ({ residents, setResidents, notify }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    unit: "",
    status: "Active",
  });

  const openModal = (user = null) => {
    if (user) {
      setCurrentUser(user);
      setIsEditing(true);
    } else {
      setCurrentUser({ id: null, name: "", unit: "", status: "Active" });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!currentUser.name || !currentUser.unit)
      return notify("Complete todos los campos", "error");

    if (isEditing) {
      setResidents(
        residents.map((r) => (r.id === currentUser.id ? currentUser : r))
      );
      notify("Residente actualizado", "success");
    } else {
      setResidents([...residents, { ...currentUser, id: Date.now() }]);
      notify("Residente agregado", "success");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Está seguro de eliminar este residente?")) {
      setResidents(residents.filter((r) => r.id !== id));
      notify("Residente eliminado", "success");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
          <Users className="text-orange-600" /> Padrón de Residentes
        </h3>
        <Button size="sm" onClick={() => openModal()}>
          + AGREGAR NUEVO
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Nombre Completo</th>
              <th className="px-6 py-4">Unidad (UF)</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {residents.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-700">{r.name}</td>
                <td className="px-6 py-4 font-medium text-slate-600">
                  {r.unit}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                      r.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : r.status === "Debtor"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {r.status === "Active"
                      ? "ACTIVO"
                      : r.status === "Debtor"
                      ? "MOROSO"
                      : "INACTIVO"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button
                    onClick={() => openModal(r)}
                    className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* MODAL ALTA/EDICION */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-lg text-slate-800">
                {isEditing ? "Editar Residente" : "Nuevo Residente"}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <XCircle className="text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nombre Completo
                </label>
                <input
                  className="w-full p-3 border rounded-lg bg-slate-50 outline-none focus:border-orange-500"
                  value={currentUser.name}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Unidad Funcional
                </label>
                <input
                  className="w-full p-3 border rounded-lg bg-slate-50 outline-none focus:border-orange-500"
                  value={currentUser.unit}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, unit: e.target.value })
                  }
                  placeholder="Ej: UF 101"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Estado
                </label>
                <select
                  className="w-full p-3 border rounded-lg bg-slate-50 outline-none focus:border-orange-500"
                  value={currentUser.status}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, status: e.target.value })
                  }
                >
                  <option value="Active">ACTIVO (Permitir Acceso)</option>
                  <option value="Debtor">MOROSO (Restringido)</option>
                  <option value="Inactive">INACTIVO (Denegar Acceso)</option>
                </select>
              </div>
              <Button className="w-full mt-2" onClick={handleSave}>
                <Save size={18} /> GUARDAR DATOS
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ReportsModule = ({ notify }) => {
  const [reportType, setReportType] = useState("visitas");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateReport = () => {
    if (!startDate || !endDate) {
      notify("Por favor seleccione un rango de fechas.", "error");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      let data = [];
      switch (reportType) {
        case "visitas":
          data = AUTHORIZED_VISITS_DB.map((v) => ({
            Fecha: v.date || "2023-10-25",
            Hora_Ingreso: v.time,
            Hora_Salida: "---",
            Visitante: v.visitor,
            DNI: v.dni,
            Destino: v.host,
            Tipo: "Visita",
            Estado: v.status,
          }));
          break;
        case "amenities":
          data = [
            {
              Recurso: "SUM",
              Capacidad: 50,
              Reservas_Totales: 24,
              Ocupacion_Promedio: "65%",
              Horas_Pico: "20:00 - 00:00",
            },
            {
              Recurso: "Piscina",
              Capacidad: 30,
              Reservas_Totales: 112,
              Ocupacion_Promedio: "88%",
              Horas_Pico: "15:00 - 18:00",
            },
          ];
          break;
        case "incidentes":
          data = INCIDENTS_DB.map((i) => ({
            ID: i.id,
            Fecha: i.date,
            Tipo: i.type,
            Detalle: i.detail,
            Gravedad: i.severity.toUpperCase(),
            Ubicacion: i.location,
            Estado: i.status,
          }));
          break;
        default:
          data = [];
      }
      setReportData(data);
      setIsLoading(false);
      notify("Reporte generado exitosamente.", "success");
    }, 800);
  };

  const exportToCSV = () => {
    if (!reportData || reportData.length === 0)
      return notify("No hay datos para exportar.", "error");
    const headers = Object.keys(reportData[0]).join(",");
    const rows = reportData.map((row) => Object.values(row).join(","));
    const blob = new Blob([[headers, ...rows].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `reporte_${reportType}_${startDate}_${endDate}.csv`;
    link.click();
    notify("Descarga iniciada.", "info");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <FileBarChart className="text-orange-600" /> Generador de Reportes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="w-full space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">
              Tipo de Reporte
            </label>
            <div className="relative">
              <select
                value={reportType}
                onChange={(e) => {
                  setReportType(e.target.value);
                  setReportData(null);
                }}
                className="w-full p-3 border-2 border-slate-200 rounded-lg bg-slate-50 font-bold text-slate-700 outline-none focus:border-orange-500 appearance-none cursor-pointer"
              >
                <option value="visitas">Ingresos y Salidas</option>
                <option value="amenities">Ocupación Amenities</option>
                <option value="incidentes">Historial Incidentes</option>
                <option value="proveedores">Recursos Proveedores</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="w-full space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">
              Desde
            </label>
            <input
              type="date"
              className="w-full p-3 border-2 border-slate-200 rounded-lg bg-slate-50 font-bold text-slate-700 outline-none focus:border-orange-500"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="w-full space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">
              Hasta
            </label>
            <input
              type="date"
              className="w-full p-3 border-2 border-slate-200 rounded-lg bg-slate-50 font-bold text-slate-700 outline-none focus:border-orange-500"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Button
              onClick={generateReport}
              disabled={isLoading}
              className="w-full h-[50px]"
            >
              {isLoading ? "Procesando..." : "GENERAR"}
            </Button>
          </div>
        </div>
      </Card>

      {reportData && (
        <div className="animate-fade-in-up space-y-4">
          <div className="flex justify-between items-center bg-slate-100 p-3 rounded-lg border border-slate-200">
            <div>
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-tight">
                Vista Previa del Reporte
              </h3>
              <p className="text-xs text-slate-500">
                Periodo: {startDate} al {endDate}
              </p>
            </div>
            <Button variant="success" size="sm" onClick={exportToCSV}>
              <FileSpreadsheet size={16} /> EXPORTAR CSV
            </Button>
          </div>
          <Card className="p-0 overflow-x-auto border-t-4 border-t-orange-500">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black border-b border-slate-100 tracking-wider">
                <tr>
                  {Object.keys(reportData[0]).map((header) => (
                    <th key={header} className="px-6 py-4">
                      {header.replace(/_/g, " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reportData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-orange-50/50 transition-colors"
                  >
                    {Object.values(row).map((val, i) => (
                      <td
                        key={i}
                        className="px-6 py-4 font-medium text-slate-700"
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
};

// --- MÓDULOS DE GUARDIA ---

// --- COMPONENTE: REPORTE DE CIERRE DE TURNO ---
const ShiftReportModal = ({
  onClose,
  onConfirm,
  guardName,
  logs = [],
  tasks = [],
  addGlobalNotification,
}) => {
  const isPending = (s) => {
    const v = String(s ?? "pending").toLowerCase();
    return v === "pending" || v === "pendiente" || v === "open" || v === "todo";
  };

  const pending = (tasks ?? []).filter((t) => isPending(t.status));

  const isHigh = (p) => String(p ?? "").toLowerCase() === "high";

  const summary = {
    total: tasks?.length ?? 0,
    pendingCount: pending.length,
    pendingHigh: pending.filter((t) => isHigh(t.priority)).length,
    pendingTitles: pending
      .slice(0, 5)
      .map((t) => t.title ?? t.name ?? "Sin título"),
  };
  const taskCompleted = (tasks ?? []).filter(
    (t) => String(t.status ?? "").toLowerCase() === "completed"
  ).length;
  const taskActive = (tasks ?? []).filter(
    (t) => String(t.status ?? "").toLowerCase() === "active"
  ).length;

  const stats = [
    {
      label: "Tareas completadas",
      value: taskCompleted,
      tone: "emerald",
      icon: "CheckCircle",
    },
    {
      label: "Pendientes",
      value: summary.pendingCount,
      tone: "orange",
      icon: "ClipboardList",
    },
    {
      label: "En curso",
      value: taskActive,
      tone: "blue",
      icon: "PlayCircle",
    },
    {
      label: "Eventos del turno",
      value: logs.length,
      tone: "slate",
      icon: "Activity",
    },
  ];

  const [finalNotes, setFinalNotes] = useState("");

  const handleConfirm = () => {
    const withSummaryLogs =
      summary.pendingCount === 0
        ? logs
        : [
            {
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              type: "RESUMEN",
              detail: `Pendientes al cierre: ${summary.pendingCount} (Alta: ${summary.pendingHigh})`,
            },
            ...logs,
          ];

    const report = {
      id: Date.now(),
      guardName,
      createdAt: new Date().toISOString(),
      logs: withSummaryLogs, // <-- usar logs con resumen
      tasksSummary: summary,
      finalNotes: finalNotes.trim() || null,
    };

    if (finalNotes.trim()) {
      addGlobalNotification?.({
        type: "alert",
        title: "Cierre de turno: Observaciones",
        message: `Guardia: ${guardName}\n\n${finalNotes.trim()}`,
        priority: "high",
      });
    }

    if (typeof onConfirm === "function") onConfirm(report);
    else onClose?.();
  };

  const alertsCount = logs.filter((l) => l.type === "ALERTA").length;

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        <div className="bg-slate-800 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-white text-xl font-black uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="text-emerald-400" /> Reporte de Cierre de
              Turno
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Libro de Novedades Digital
            </p>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-sm">{guardName}</p>
            <p className="text-slate-400 text-xs">
              Turno Día • {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {/* ✅ 0) Resumen rápido (stats) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {/* Tile 1 */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-emerald-700">
                {taskCompleted}
              </div>
              <div className="text-xs text-emerald-600 font-medium">
                Tareas Completadas
              </div>
            </div>

            {/* Tile 2 */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
              <ClipboardList className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-orange-700">
                {summary.pendingCount}
              </div>
              <div className="text-xs text-orange-600 font-medium">
                Pendientes
              </div>
            </div>

            {/* Tile 3 */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <PlayCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-blue-700">
                {taskActive}
              </div>
              <div className="text-xs text-blue-600 font-medium">En curso</div>
            </div>

            {/* Tile 4 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <AlertTriangle className="w-6 h-6 text-slate-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-slate-700">
                {alertsCount}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                Alertas del turno
              </div>
            </div>
          </div>

          {/* ✅ 1) Resumen SIEMPRE visible */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4">
            <h3 className="text-xs font-black text-slate-500 uppercase mb-2">
              Resumen de Pendientes (al cierre)
            </h3>

            {/* Observaciones finales */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4">
              <h3 className="text-xs font-black text-slate-500 uppercase mb-2">
                Observaciones finales (opcional)
              </h3>
              <textarea
                value={finalNotes}
                onChange={(e) => setFinalNotes(e.target.value)}
                placeholder="Escribí observaciones relevantes para Administración (incidentes, pendientes críticos, novedades, etc.)"
                className="w-full min-h-[110px] p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm outline-none focus:border-orange-500"
              />
              <p className="text-[11px] text-slate-400 mt-2">
                Se adjuntará al reporte de cierre de turno.
              </p>
            </div>

            {pending.length === 0 ? (
              <p className="text-sm text-emerald-700 font-bold">
                Sin pendientes. Turno al día.
              </p>
            ) : (
              <div className="text-sm text-slate-700 space-y-2">
                <p>
                  Quedan <b>{pending.length}</b> tareas pendientes (Alta:{" "}
                  <b>{summary.pendingHigh}</b>).
                </p>
                <ul className="list-disc pl-5 text-slate-600">
                  {summary.pendingTitles.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                  {pending.length > summary.pendingTitles.length && (
                    <li className="text-slate-400">
                      +{pending.length - summary.pendingTitles.length} más…
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* ✅ 2) Cronología CONDICIONAL */}
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400 space-y-4">
              <ClipboardList size={64} className="opacity-20" />
              <p className="font-bold">
                Sin actividad registrada en este turno.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-500 uppercase mb-4">
                Cronología de Eventos
              </h3>

              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex gap-4"
                >
                  <span className="font-mono text-xs font-bold text-slate-400 min-w-[60px]">
                    {log.time}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {log.type}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800">
                        {log.detail}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 bg-white flex justify-end gap-4">
          <Button variant="ghost" onClick={onClose}>
            CANCELAR
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
          >
            <Send size={18} /> CONFIRMAR Y ENVIAR
          </Button>
        </div>
      </div>
    </div>
  );
};

// 4. MÓDULO DE TAREAS PENDIENTES / RELEVOS
const GuardTasksScreen = ({ setScreen, notify, addLog, tasks, setTasks }) => {
  const [tab, setTab] = useState("all"); // "pending" | "active" | "completed"
  const getStatus = (t) => t.status ?? "pending";

  const normalizeTask = (t) => ({
    id: t.id ?? Date.now(),
    title: t.title ?? t.name ?? "Sin título",
    description: t.description ?? t.desc ?? "",
    priority: t.priority ?? t.level ?? "normal",
    status: t.status ?? "pending",
    author: t.author ?? "Sistema",
    date: t.date ?? "—",
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("normal");

  const handleAddTask = () => {
    if (!newTaskTitle) return;

    const task = normalizeTask({
      id: Date.now(),
      title: newTaskTitle,
      description: newTaskDesc,
      priority: newTaskPriority,
      status: "pending",
      author: "Guardia Turno Actual",
      date: "Ahora",
    });

    TASKS_DB.unshift(task); // opcional mock persist
    setTasks((prev) => [task, ...prev]);

    setNewTaskTitle("");
    setNewTaskDesc("");
    notify("Tarea agregada al relevo.", "success");
    addLog?.("TAREA", `Nueva tarea creada: ${task.title}`);
  };

  const startTask = (id) => {
    const taskToStart = tasks.find((t) => t.id === id);

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "active",
              startedAt: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : t
      )
    );

    // Persistir mock (opcional)
    TASKS_DB.splice(
      0,
      TASKS_DB.length,
      ...TASKS_DB.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "active",
              startedAt: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : t
      )
    );

    notify("Tarea iniciada.", "success");
    const title = taskToStart?.title ?? taskToStart?.name ?? "Sin título";
    addLog?.("TAREA", `Tarea iniciada: ${title}`);
  };

  // completeTask queda igual...
  const completeTask = (id) => {
    const taskToComplete = tasks.find((t) => t.id === id);

    if ((taskToComplete?.status ?? "pending") !== "active") {
      return notify("Primero debés iniciar la tarea.", "warning");
    }

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "completed",
              completedAt: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : t
      )
    );

    // Persistir mock (opcional)
    TASKS_DB.splice(
      0,
      TASKS_DB.length,
      ...TASKS_DB.map((t) => (t.id === id ? { ...t, status: "completed" } : t))
    );

    notify("Tarea marcada como realizada.", "success");
    const title = taskToComplete?.title ?? taskToComplete?.name ?? "Sin título";
    addLog?.("TAREA", `Tarea completada: ${title}`);
  };
  const activeTasks = tasks.filter((t) => getStatus(t) === "active");
  const pendingTasks = tasks.filter((t) => getStatus(t) === "pending");
  const completedTasks = tasks.filter((t) => getStatus(t) === "completed");

  const visibleTasks =
    tab === "all"
      ? [] // en "all" no usamos visibleTasks
      : tab === "active"
      ? activeTasks
      : tab === "pending"
      ? pendingTasks
      : completedTasks;

  const statusLabel = (s) =>
    s === "active"
      ? "EN CURSO"
      : s === "completed"
      ? "COMPLETADA"
      : "PENDIENTE";

  const statusBadgeClass = (s) =>
    s === "active"
      ? "bg-blue-100 text-blue-700"
      : s === "completed"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-slate-100 text-slate-600";

  const TaskCard = ({
    task,
    startTask,
    completeTask,
    statusLabel,
    statusBadgeClass,
  }) => (
    <div
      className={`bg-white p-4 rounded-xl shadow-sm border-l-4 relative group hover:shadow-md transition-all ${
        task.priority === "high"
          ? "border-red-500"
          : task.priority === "normal"
          ? "border-blue-500"
          : "border-slate-400"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {task.priority === "high" && (
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-100 text-red-700">
              PRIORIDAD ALTA
            </span>
          )}

          <span
            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${statusBadgeClass(
              task.status
            )}`}
          >
            {statusLabel(task.status)}
          </span>
        </div>

        <span className="text-xs text-slate-400 font-bold">{task.date}</span>
      </div>

      <h4 className="font-black text-lg text-slate-800 leading-tight mb-1">
        {task.title}
      </h4>
      <p className="text-sm text-slate-600 mb-3">{task.description}</p>

      {task.status === "active" && task.startedAt && (
        <p className="text-xs text-blue-600 font-bold mb-3">
          Iniciada: {task.startedAt}
        </p>
      )}
      {task.status === "completed" && task.completedAt && (
        <p className="text-xs text-emerald-700 font-bold mb-3">
          Finalizada: {task.completedAt}
        </p>
      )}

      <div className="flex justify-between items-center pt-2 border-t border-slate-100 mt-2">
        <span className="text-xs font-bold text-slate-400 uppercase">
          Por: {task.author}
        </span>

        {task.status === "pending" && (
          <button
            onClick={() => startTask(task.id)}
            className="flex items-center gap-2 text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-100 transition-colors uppercase"
          >
            ▶ INICIAR
          </button>
        )}

        {task.status === "active" && (
          <button
            onClick={() => completeTask(task.id)}
            className="flex items-center gap-2 text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded hover:bg-emerald-100 transition-colors uppercase"
          >
            COMPLETAR
          </button>
        )}

        {task.status === "completed" && (
          <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
            FINALIZADA
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 animate-fade-in-up">
      <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-4 shadow-sm">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setScreen("dashboard")}
        >
          <ArrowLeft className="w-4 h-4" /> VOLVER
        </Button>
        <h2 className="font-black text-xl text-slate-800 tracking-tight">
          LIBRO DE TAREAS Y RELEVOS
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
        {/* SECCIÓN CREAR TAREA (IZQUIERDA) */}
        <div className="w-full md:w-1/3 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-700 mb-4 flex items-center gap-2">
              <Plus size={20} /> Dejar Pendiente / Consigna
            </h3>
            <div className="space-y-3">
              <input
                className="w-full p-3 border rounded-lg bg-slate-50 text-sm font-bold"
                placeholder="Título de la tarea..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <textarea
                className="w-full p-3 border rounded-lg bg-slate-50 text-sm"
                rows="3"
                placeholder="Detalles o instrucciones..."
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
              ></textarea>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Prioridad
                </label>
                <div className="flex gap-2">
                  {["low", "normal", "high"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setNewTaskPriority(p)}
                      className={`flex-1 py-2 rounded text-xs font-black uppercase border ${
                        newTaskPriority === p
                          ? p === "high"
                            ? "bg-red-500 text-white border-red-500"
                            : p === "normal"
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-slate-500 text-white border-slate-500"
                          : "bg-white text-slate-400 border-slate-200"
                      }`}
                    >
                      {p === "high"
                        ? "Alta"
                        : p === "normal"
                        ? "Normal"
                        : "Baja"}
                    </button>
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={handleAddTask}>
                AGREGAR TAREA
              </Button>
            </div>
          </div>
        </div>

        {/* LISTA DE TAREAS (DERECHA) */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-black text-slate-500 uppercase text-xs">
              Libro de Tareas
            </h3>

            <div className="flex gap-2">
              {[
                { k: "all", label: "Todas" },
                { k: "pending", label: "Pendientes" },
                { k: "active", label: "En curso" },
                { k: "completed", label: "Completadas" },
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase border transition-colors ${
                    tab === t.k
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {tab === "all" ? (
            <div className="space-y-8">
              {/* EN CURSO */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-black uppercase text-slate-400">
                    En curso ({activeTasks.length})
                  </h4>
                  <div className="h-px flex-1 bg-slate-200 ml-3" />
                </div>

                {activeTasks.length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-slate-300 rounded-xl text-slate-400 font-bold">
                    No hay tareas en curso.
                  </div>
                ) : (
                  activeTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      startTask={startTask}
                      completeTask={completeTask}
                      statusLabel={statusLabel}
                      statusBadgeClass={statusBadgeClass}
                    />
                  ))
                )}
              </div>

              {/* PENDIENTES */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-black uppercase text-slate-400">
                    Pendientes ({pendingTasks.length})
                  </h4>
                  <div className="h-px flex-1 bg-slate-200 ml-3" />
                </div>

                {pendingTasks.length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-slate-300 rounded-xl text-slate-400 font-bold">
                    No hay tareas pendientes.
                  </div>
                ) : (
                  pendingTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      startTask={startTask}
                      completeTask={completeTask}
                      statusLabel={statusLabel}
                      statusBadgeClass={statusBadgeClass}
                    />
                  ))
                )}
              </div>

              {/* COMPLETADAS */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-black uppercase text-slate-400">
                    Completadas ({completedTasks.length})
                  </h4>
                  <div className="h-px flex-1 bg-slate-200 ml-3" />
                </div>

                {completedTasks.length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-slate-300 rounded-xl text-slate-400 font-bold">
                    No hay tareas completadas.
                  </div>
                ) : (
                  <div className="space-y-3 opacity-70">
                    {completedTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        startTask={startTask}
                        completeTask={completeTask}
                        statusLabel={statusLabel}
                        statusBadgeClass={statusBadgeClass}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : visibleTasks.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-slate-300 rounded-xl text-slate-400 font-bold">
              No hay tareas en esta categoría.
            </div>
          ) : (
            visibleTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                startTask={startTask}
                completeTask={completeTask}
                statusLabel={statusLabel}
                statusBadgeClass={statusBadgeClass}
              />
            ))
          )}

          {/* Tareas Completadas (Historial) */}
        </div>
      </div>
    </div>
  );
};

const GuardNotificationCenter = ({ notifications, setScreen, markAsRead }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 animate-fade-in-up">
      <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-4 shadow-sm">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setScreen("dashboard")}
        >
          <ArrowLeft className="w-4 h-4" /> VOLVER
        </Button>
        <h2 className="font-black text-xl text-slate-800 tracking-tight">
          NOVEDADES Y AVISOS
        </h2>
      </div>
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
            <RadioReceiver size={48} className="mb-2 opacity-20" />
            <p className="font-bold">Sin novedades entrantes</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white p-5 rounded-xl border-l-8 shadow-sm relative overflow-hidden transition-all ${
                notif.read
                  ? "border-slate-300 opacity-60"
                  : notif.priority === "critical" || notif.type === "evacuation"
                  ? "border-red-600 bg-red-50"
                  : "border-orange-500"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {notif.priority === "critical" ? (
                    <AlertTriangle
                      className="text-red-600 animate-pulse"
                      size={20}
                    />
                  ) : (
                    <Bell className="text-slate-400" size={16} />
                  )}
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      notif.priority === "critical"
                        ? "bg-red-200 text-red-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {notif.type === "alert"
                      ? "ADMINISTRACIÓN"
                      : notif.type === "evacuation"
                      ? "EVACUACIÓN"
                      : "RESIDENTE"}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono font-bold">
                  {notif.date}
                </span>
              </div>

              <h3
                className={`font-black text-lg mb-1 ${
                  notif.priority === "critical"
                    ? "text-red-700"
                    : "text-slate-800"
                }`}
              >
                {notif.title}
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
                {notif.message}
              </p>

              {!notif.read && (
                <div className="flex justify-end">
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="flex items-center gap-2 text-xs font-black text-slate-500 bg-slate-100 px-3 py-2 rounded hover:bg-slate-200 hover:text-slate-800 transition-colors uppercase"
                  >
                    <CheckCircle size={14} /> Marcar como Enterado
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 1. MÓDULO DE PROVEEDORES: Wizard con Checklist de Seguridad
const GuardSupplierWizard = ({ setScreen, notify }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dni: "",
    name: "",
    company: "",
    plate: "",
    destination: "",
  });
  const [checklist, setChecklist] = useState({
    art: false,
    trunk: false,
    tools: false,
    badge: false,
  });

  const updateForm = (field, value) =>
    setFormData({ ...formData, [field]: value });
  const toggleCheck = (field) =>
    setChecklist({ ...checklist, [field]: !checklist[field] });

  const allChecksPassed = Object.values(checklist).every(Boolean);

  const handleFinish = () => {
    notify(
      `ACCESO AUTORIZADO\nProveedor: ${formData.company}\nDestino: ${formData.destination}`
    );
    setScreen("dashboard");
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 animate-fade-in-up">
      <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-4 shadow-sm">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setScreen("dashboard")}
        >
          <ArrowLeft className="w-4 h-4" /> VOLVER
        </Button>
        <h2 className="font-black text-xl text-slate-800">
          INGRESO DE PROVEEDORES
        </h2>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= 1
                ? "bg-orange-600 text-white"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            1
          </div>
          <div
            className={`h-1 flex-1 mx-2 ${
              step >= 2 ? "bg-orange-600" : "bg-slate-200"
            }`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= 2
                ? "bg-orange-600 text-white"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            2
          </div>
          <div
            className={`h-1 flex-1 mx-2 ${
              step >= 3 ? "bg-orange-600" : "bg-slate-200"
            }`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= 3
                ? "bg-orange-600 text-white"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            3
          </div>
        </div>

        {step === 1 && (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-slate-100 space-y-4 animate-fade-in-up">
            <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
              <User size={20} className="text-orange-600" /> Datos del Personal
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500">
                  DNI
                </label>
                <input
                  className="w-full p-3 border rounded-lg bg-slate-50 font-bold"
                  placeholder="Escanee DNI"
                  value={formData.dni}
                  onChange={(e) => updateForm("dni", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500">
                  Nombre Completo
                </label>
                <input
                  className="w-full p-3 border rounded-lg bg-slate-50"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">
                Empresa / Rubro
              </label>
              <input
                className="w-full p-3 border rounded-lg bg-slate-50"
                placeholder="Ej: Cablevisión"
                value={formData.company}
                onChange={(e) => updateForm("company", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500">
                  Patente Vehículo
                </label>
                <input
                  className="w-full p-3 border rounded-lg bg-slate-50 uppercase"
                  placeholder="AAA 123"
                  value={formData.plate}
                  onChange={(e) => updateForm("plate", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500">
                  Destino (UF)
                </label>
                <input
                  className="w-full p-3 border rounded-lg bg-slate-50"
                  placeholder="UF..."
                  value={formData.destination}
                  onChange={(e) => updateForm("destination", e.target.value)}
                />
              </div>
            </div>
            <Button
              className="w-full mt-4"
              disabled={!formData.dni || !formData.company}
              onClick={() => setStep(2)}
            >
              SIGUIENTE: PROTOCOLO
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg border-l-4 border-l-orange-500 space-y-6 animate-fade-in-up">
            <div className="text-center">
              <Shield size={48} className="mx-auto text-orange-600 mb-2" />
              <h3 className="font-black text-xl text-slate-800 uppercase">
                Protocolo de Seguridad
              </h3>
              <p className="text-sm text-slate-500">
                Debe cumplir todos los pasos para autorizar.
              </p>
            </div>
            <div className="space-y-3">
              <label
                className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  checklist.art
                    ? "bg-emerald-50 border-emerald-500"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    checklist.art
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-white border-slate-300"
                  }`}
                >
                  {checklist.art && (
                    <CheckSquare size={16} className="text-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={checklist.art}
                  onChange={() => toggleCheck("art")}
                />
                <span className="font-bold text-slate-700">
                  Seguro / ART Vigente
                </span>
              </label>

              <label
                className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  checklist.trunk
                    ? "bg-emerald-50 border-emerald-500"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    checklist.trunk
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-white border-slate-300"
                  }`}
                >
                  {checklist.trunk && (
                    <CheckSquare size={16} className="text-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={checklist.trunk}
                  onChange={() => toggleCheck("trunk")}
                />
                <span className="font-bold text-slate-700">
                  Revisión de Baúl / Caja
                </span>
              </label>

              <label
                className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  checklist.tools
                    ? "bg-emerald-50 border-emerald-500"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    checklist.tools
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-white border-slate-300"
                  }`}
                >
                  {checklist.tools && (
                    <CheckSquare size={16} className="text-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={checklist.tools}
                  onChange={() => toggleCheck("tools")}
                />
                <span className="font-bold text-slate-700">
                  Registro de Herramientas
                </span>
              </label>

              <label
                className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  checklist.badge
                    ? "bg-emerald-50 border-emerald-500"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    checklist.badge
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-white border-slate-300"
                  }`}
                >
                  {checklist.badge && (
                    <CheckSquare size={16} className="text-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={checklist.badge}
                  onChange={() => toggleCheck("badge")}
                />
                <span className="font-bold text-slate-700">
                  Retención DNI / Entrega Tarjeta
                </span>
              </label>
            </div>
            <Button
              className="w-full mt-4"
              disabled={!allChecksPassed}
              onClick={() => setStep(3)}
            >
              CONFIRMAR CUMPLIMIENTO
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-md mx-auto text-center space-y-6 pt-10 animate-fade-in-up">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4 animate-bounce">
              <CheckCircle size={64} />
            </div>
            <h3 className="text-2xl font-black text-slate-800">
              ¡ACCESO HABILITADO!
            </h3>
            <p className="text-slate-500">
              El proveedor ha sido registrado y notificado al propietario.
            </p>
            <Button
              size="lg"
              className="w-full shadow-xl"
              onClick={handleFinish}
            >
              FINALIZAR PROCESO
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. MÓDULO DE PAQUETERÍA: Versión Data Entry
const SENDERS = [
  "Mercado Libre",
  "Correo Argentino",
  "OCA",
  "Andreani",
  "Amazon",
  "Shein",
  "Otro",
];

const GuardPackageScreen = ({
  setScreen,
  notify,
  addLog,
  addGlobalNotification,
  currentUser,
}) => {
  const [mode, setMode] = useState("list"); // "list" | "create"
  const [photoTaken, setPhotoTaken] = useState(false);

  const [newPackage, setNewPackage] = useState({
    unit: "",
    company: "",
    type: "Paquete",
    receiver: currentUser || "Guardia Turno Actual",
  });

  const [packages, setPackages] = useState([
    {
      id: 1,
      unit: "UF 402",
      company: "Mercado Libre",
      type: "Paquete",
      status: "pending",
      date: "10:30",
    },
    {
      id: 2,
      unit: "UF 105",
      company: "Amazon",
      type: "Sobre",
      status: "pending",
      date: "11:15",
    },
  ]);

  const resetForm = () => {
    setNewPackage({
      unit: "",
      company: "",
      type: "Paquete",
      receiver: currentUser || "Guardia Turno Actual",
    });

    setPhotoTaken(false);
  };

  const isFormValid =
    newPackage.unit.trim() &&
    newPackage.company.trim() &&
    newPackage.type &&
    photoTaken;

  const handleNotifyUnit = (pkg) => {
    notify(`Recordatorio enviado a ${pkg.unit}`, "success");

    // status interno
    setPackages((prev) =>
      prev.map((p) => (p.id === pkg.id ? { ...p, status: "notified" } : p))
    );

    addLog?.(
      "PAQUETERÍA",
      `Notificación enviada a ${pkg.unit} (${pkg.type} • ${pkg.company})`
    );

    addGlobalNotification?.({
      title: "Notificación enviada",
      message: `Se notificó a ${pkg.unit} por ${pkg.type} • ${pkg.company}`,
      type: "alert",
      priority: "normal",
    });
  };

  const handleSave = () => {
    if (!newPackage.unit || !newPackage.company)
      return notify("Complete los datos", "error");
    if (!photoTaken) return notify("Falta la evidencia fotográfica", "error");

    const pkg = {
      id: Date.now(),
      ...newPackage,
      status: "pending",
      date: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setPackages((prev) => [pkg, ...prev]);

    notify(`Paquete registrado para ${pkg.unit}`, "success");

    addLog?.(
      "PAQUETERÍA",
      `Ingreso: ${pkg.type} para ${pkg.unit} (${pkg.company})`
    );

    addGlobalNotification?.({
      title: "Nuevo ingreso de paquetería",
      message: `${pkg.type} para ${pkg.unit} • ${pkg.company}`,
      type: "alert",
      priority: "normal",
    });

    setMode("list");
    resetForm();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 animate-fade-in-up">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              mode === "create" ? setMode("list") : setScreen("dashboard")
            }
          >
            <ArrowLeft className="w-4 h-4" />{" "}
            {mode === "create" ? "CANCELAR" : "VOLVER"}
          </Button>
          <div>
            <h2 className="font-black text-xl text-slate-800 tracking-tight">
              {mode === "create" ? "RECEPCIÓN DE PAQUETERÍA" : "PAQUETERÍA"}
            </h2>
            {mode === "create" && (
              <p className="text-xs text-slate-500 font-bold uppercase">
                Oficial Responsable:{" "}
                {newPackage.receiver || "Guardia Turno Actual"}
              </p>
            )}
          </div>
        </div>

        {mode === "list" && (
          <Button size="sm" onClick={() => setMode("create")}>
            + RECIBIR
          </Button>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 p-6 overflow-y-auto">
        {mode === "list" ? (
          // LISTA (igual que la tuya, levemente ordenada)
          <div className="max-w-4xl mx-auto space-y-4">
            <h3 className="font-bold text-slate-500 uppercase text-xs">
              En Guardia ({packages.length})
            </h3>

            {packages.length === 0 ? (
              <div className="text-center text-slate-400 py-10 border-2 border-dashed rounded-xl">
                No hay paquetes pendientes.
              </div>
            ) : (
              packages.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                      <Box size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-800 text-lg">
                          {p.unit}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-bold">
                          {p.type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{p.company}</p>
                      <p className="text-xs text-slate-400 font-mono mt-1">
                        {p.date}
                      </p>
                    </div>
                  </div>

                  <button
                    className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg font-bold text-xs hover:bg-orange-100 uppercase"
                    onClick={() => handleNotifyUnit(p)}
                  >
                    Notificar
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          // CREATE (layout tipo 2 columnas)
          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            {/* Left column */}
            <div className="flex-1 p-8 space-y-6 border-r border-slate-100">
              {/* 1. Unidad */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                  1. Unidad destino
                </label>
                <input
                  className="w-full pl-4 pr-4 py-3 rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-900 focus:border-orange-500 outline-none font-bold"
                  placeholder="Ej: UF 402"
                  value={newPackage.unit}
                  onChange={(e) =>
                    setNewPackage((p) => ({ ...p, unit: e.target.value }))
                  }
                  autoFocus
                />
              </div>

              {/* 2-3 grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 2. Tipo */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                    2. Tipo de correspondencia
                  </label>
                  <div className="relative">
                    <select
                      value={newPackage.type}
                      onChange={(e) =>
                        setNewPackage((p) => ({ ...p, type: e.target.value }))
                      }
                      className="w-full pl-4 pr-10 py-3 rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-900 focus:border-orange-500 outline-none appearance-none font-medium cursor-pointer hover:bg-white"
                    >
                      {PACKAGE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Remitente */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                    3. Remitente / Empresa
                  </label>
                  <div className="relative">
                    <select
                      value={newPackage.company}
                      onChange={(e) =>
                        setNewPackage((p) => ({
                          ...p,
                          company: e.target.value,
                        }))
                      }
                      className="w-full pl-4 pr-10 py-3 rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-900 focus:border-orange-500 outline-none appearance-none font-medium cursor-pointer hover:bg-white"
                    >
                      <option value="">Seleccionar…</option>
                      {SENDERS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* 4. Recibido por */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                  4. Recibido por
                </label>
                <div className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 font-bold flex items-center gap-2 cursor-not-allowed">
                  <Shield className="w-4 h-4" />
                  Guardia Turno Actual (Verificado)
                </div>
              </div>
            </div>

            {/* Right column - photo + CTA */}
            <div className="w-full md:w-1/3 bg-slate-50 p-8 flex flex-col justify-between border-l border-slate-200">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-wider text-slate-600 text-center block">
                  5. Evidencia fotográfica
                </label>

                <div
                  onClick={() => setPhotoTaken((v) => !v)}
                  className={`w-full aspect-square rounded-2xl border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all group relative overflow-hidden ${
                    photoTaken
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-300 hover:border-orange-500 hover:bg-orange-50"
                  }`}
                >
                  {photoTaken ? (
                    <div className="relative z-10 flex flex-col items-center text-emerald-700">
                      <CheckCircle className="w-12 h-12 mb-2 drop-shadow-md" />
                      <span className="font-black">FOTO OK</span>
                    </div>
                  ) : (
                    <div className="text-slate-400 group-hover:text-orange-500 flex flex-col items-center">
                      <Camera className="w-12 h-12 mb-2" />
                      <span className="font-bold text-sm">TOMAR FOTO</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-center text-slate-400">
                  Toque el recuadro para simular la captura.
                </p>
              </div>

              <div className="mt-8">
                <Button
                  onClick={handleSave}
                  disabled={!isFormValid}
                  className="w-full py-4 text-base shadow-xl bg-orange-600 hover:bg-orange-700 font-bold"
                >
                  <Send className="w-5 h-5 mr-2" />
                  REGISTRAR Y NOTIFICAR
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Módulo de Rondas
const GuardRoundsScreen = ({ setScreen, notify, addLog }) => {
  const [points, setPoints] = useState(ROUND_POINTS_DATA);

  const getDistance = (p1, p2) => {
    if (!p1 || !p2) return Number.POSITIVE_INFINITY; // o null
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
  };

  const checkPoint = (id) => {
    const targetPoint = points.find((p) => p.id === id);

    if (!targetPoint?.pos) {
      console.warn("Checkpoint inválido:", targetPoint);
      notify?.("Seleccioná un punto válido antes de marcar.", "error");
      return;
    }

    if (!userLocation) {
      console.warn("userLocation undefined");
      notify?.("Ubicación no disponible.", "error");
      return;
    }

    const distance = getDistance(userLocation, targetPoint.pos);

    if (distance > 15) {
      notify(
        `ERROR: Estás demasiado lejos de ${targetPoint.name}. Acércate para validar.`,
        "error"
      );
      addLog?.(
        "ALERTA",
        `Intento de validación fallida (fuera de rango) en ${targetPoint.name}`
      );
      return;
    }

    setPoints((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: "checked", time: new Date().toLocaleTimeString() }
          : p
      )
    );

    notify?.("Punto de control verificado correctamente.", "success");
    addLog?.("RONDA", `Punto verificado: ${targetPoint.name} (GPS OK)`);
  };
  const [userLocation, setUserLocation] = useState(
    ROUND_POINTS_DATA[0]?.pos ?? { x: 10, y: 10 }
  );

  const teleportGuard = (targetPos) => {
    if (!targetPos) {
      console.warn("Teleport target inválido:", targetPos);
      return;
    }
    setUserLocation(targetPos);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 animate-fade-in-up">
      <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-4 shadow-sm">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setScreen("dashboard")}
        >
          <ArrowLeft className="w-4 h-4" /> VOLVER
        </Button>
        <h2 className="font-black text-xl text-slate-800">
          RONDAS ACTIVAS (GPS)
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          {points.map((point) => (
            <div
              key={point.id}
              className={`p-4 rounded-xl border-2 flex justify-between items-center transition-all ${
                point.status === "checked"
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    point.status === "checked"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {point.id}
                </div>
                <div>
                  <h4
                    className={`font-bold ${
                      point.status === "checked"
                        ? "text-emerald-900"
                        : "text-slate-800"
                    }`}
                  >
                    {point.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {point.status === "checked"
                      ? `Verificado a las ${point.time}`
                      : "Pendiente de verificación"}
                  </p>
                </div>
              </div>
              {point.status === "pending" && (
                <Button
                  size="sm"
                  onClick={() => checkPoint(point.id)}
                  className="flex gap-2"
                >
                  <MapPin size={16} /> MARCAR POSICIÓN
                </Button>
              )}
              {point.status === "checked" && (
                <CheckCircle className="text-emerald-500" />
              )}
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/3 bg-slate-800 p-6 rounded-xl text-white shadow-xl h-fit">
          <h3 className="font-bold text-sm uppercase mb-4 flex items-center gap-2">
            <LocateFixed size={18} className="text-emerald-400" /> Simular GPS
            Guardia
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Para probar la validación, "muévase" virtualmente a los puntos:
          </p>
          <div className="grid grid-cols-1 gap-2">
            {ROUND_POINTS_DATA.map((p) => (
              <button
                key={p.id}
                onClick={() => teleportGuard(p.pos)}
                className="..."
              >
                <span>Ir a: {p.name}</span>
                <Navigation size={12} className="text-emerald-400" />
              </button>
            ))}

            <button
              onClick={() => teleportGuard({ x: 0, y: 0 })}
              className="text-left text-xs font-bold py-2 px-3 bg-red-900/50 hover:bg-red-900 rounded transition-colors border border-red-800 mt-2 text-red-200"
            >
              Simular: Ubicación Lejana (Error)
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-[10px] font-mono text-emerald-400">
              COORDENADAS ACTUALES:
              <br />
              X: {userLocation.x} | Y: {userLocation.y}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PANTALLAS EXTRAÍDAS DE GUARD VIEW ---

// 1. GuardEmergencyScreen (COMPLETO Y FUNCIONAL)
const GuardEmergencyScreen = ({
  setScreen,
  notify,
  addGlobalNotification,
  addLog,
}) => {
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [showEvacuationConfirm, setShowEvacuationConfirm] = useState(false);
  const [evacuationActive, setEvacuationActive] = useState(false);

  const handleEmergencySelect = (key, data) => {
    setSelectedEmergency({ ...data, key });
    // Notificación inmediata tipo popup al sistema
    addGlobalNotification({
      type: "alert",
      title: `ALERTA: ${data.label}`,
      message: `El Guardia ha reportado: ${data.label}. Siga instrucciones.`,
      priority: data.color === "red" ? "critical" : "high",
      color: data.color,
    });
    notify(
      `Alerta de ${data.label} enviada a la comunidad.`,
      data.color === "red" ? "error" : "warning"
    );
    addLog?.("ALERTA", `Emergencia reportada: ${data.label}`);
  };

  const triggerEvacuation = () => {
    setEvacuationActive(true);
    setShowEvacuationConfirm(false);

    // Alerta CRÍTICA de Evacuación
    addGlobalNotification({
      type: "evacuation",
      title: "¡EVACUACIÓN INICIADA!",
      message: `EMERGENCIA: ${selectedEmergency.label}. PROCEDA A LOS PUNTOS DE ENCUENTRO INMEDIATAMENTE.`,
      priority: "critical",
      color: "red",
    });
    notify("PROTOCOLO DE EVACUACIÓN ACTIVADO", "error");
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white relative animate-fade-in-up">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center gap-4 shadow-sm z-10 bg-slate-900">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setScreen("dashboard")}
          className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
        >
          <ArrowLeft className="w-4 h-4" /> VOLVER
        </Button>
        <div>
          <h2 className="font-black text-xl text-white tracking-tight flex items-center gap-2">
            <Siren className="text-red-500 animate-pulse" /> GESTIÓN DE
            EMERGENCIAS
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase">
            Panel de Control Crítico
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
        {/* COLUMNA IZQUIERDA: BOTONERA */}
        <div
          className={`p-6 space-y-8 flex-1 ${
            selectedEmergency ? "md:w-1/2" : "w-full"
          }`}
        >
          {/* SECCIÓN NARANJA */}
          <div>
            <h3 className="text-orange-500 font-black uppercase tracking-widest mb-4 border-b border-orange-500/30 pb-2 flex items-center gap-2">
              <AlertTriangle size={18} /> Alertas Nivel Naranja
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["intrusion", "robo", "sismo", "fallas", "gas"].map((key) => (
                <button
                  key={key}
                  onClick={() =>
                    handleEmergencySelect(key, EMERGENCY_DATA[key])
                  }
                  className={`group relative overflow-hidden rounded-xl p-4 flex flex-col items-center justify-center gap-3 border-2 transition-all active:scale-95 h-32 ${
                    selectedEmergency?.key === key
                      ? "bg-orange-600 border-white ring-4 ring-orange-500/50"
                      : "bg-slate-800 border-orange-500/50 hover:bg-orange-900/20 hover:border-orange-500"
                  }`}
                >
                  <div
                    className={`p-3 rounded-full ${
                      selectedEmergency?.key === key
                        ? "bg-white text-orange-600"
                        : "bg-orange-500/20 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors"
                    }`}
                  >
                    {getIcon(EMERGENCY_DATA[key].icon, 24)}
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-center leading-tight">
                    {EMERGENCY_DATA[key].label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SECCIÓN ROJA */}
          <div>
            <h3 className="text-red-500 font-black uppercase tracking-widest mb-4 border-b border-red-500/30 pb-2 flex items-center gap-2">
              <Flame size={18} /> Emergencias Críticas Nivel Rojo
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {["incendio", "bomba", "quimico", "tirador"].map((key) => (
                <button
                  key={key}
                  onClick={() =>
                    handleEmergencySelect(key, EMERGENCY_DATA[key])
                  }
                  className={`group relative overflow-hidden rounded-xl p-4 flex flex-col items-center justify-center gap-3 border-2 transition-all active:scale-95 h-32 ${
                    selectedEmergency?.key === key
                      ? "bg-red-600 border-white ring-4 ring-red-500/50"
                      : "bg-slate-800 border-red-500/50 hover:bg-red-900/20 hover:border-red-500"
                  }`}
                >
                  <div
                    className={`p-3 rounded-full ${
                      selectedEmergency?.key === key
                        ? "bg-white text-red-600"
                        : "bg-red-500/20 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors"
                    }`}
                  >
                    {getIcon(EMERGENCY_DATA[key].icon, 24)}
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-center leading-tight">
                    {EMERGENCY_DATA[key].label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: MANUAL Y EVACUACIÓN (Solo visible si hay selección) */}
        {selectedEmergency && (
          <div className="bg-slate-800 border-l border-slate-700 md:w-1/2 p-6 flex flex-col animate-fade-in-up shadow-2xl relative z-20">
            <div className="flex-1">
              <div
                className={`inline-block px-3 py-1 rounded mb-4 text-xs font-black uppercase tracking-widest ${
                  selectedEmergency.color === "red"
                    ? "bg-red-500 text-white"
                    : "bg-orange-500 text-white"
                }`}
              >
                Protocolo Activo
              </div>

              <h2 className="text-3xl font-black mb-6 leading-none">
                {selectedEmergency.label}
              </h2>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-600 mb-8">
                <h4 className="text-slate-400 uppercase text-xs font-bold mb-4 flex items-center gap-2">
                  <Info size={16} /> Manual de Procedimiento
                </h4>
                <div className="space-y-3 text-sm font-medium text-slate-200 leading-relaxed">
                  <ol className="space-y-2 list-decimal pl-5">
                    {(selectedEmergency.steps ?? []).map((step, idx) => (
                      <li key={idx} className="text-slate-200">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                {selectedEmergency.call911 && (
                  <a
                    href="tel:911"
                    onClick={() =>
                      addLog?.(
                        "ALERTA",
                        `Llamada sugerida a 911 por: ${selectedEmergency.label}`
                      )
                    }
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-red-700 font-black uppercase tracking-widest border-2 border-red-500 hover:bg-red-50"
                  >
                    <PhoneCall size={18} />
                    LLAMAR 911
                  </a>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700">
              {!evacuationActive ? (
                <button
                  onClick={() => setShowEvacuationConfirm(true)}
                  className="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-lg rounded-xl shadow-lg hover:shadow-red-900/50 transition-all border-b-4 border-red-800 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-4 animate-pulse"
                >
                  <Megaphone size={32} />
                  ALERTA DE EVACUACIÓN
                </button>
              ) : (
                <div className="w-full py-6 bg-red-900/50 border-2 border-red-500 text-red-500 font-black uppercase tracking-widest text-center rounded-xl animate-pulse flex flex-col items-center justify-center gap-2">
                  <Siren size={40} />
                  <span>EVACUACIÓN EN CURSO</span>
                </div>
              )}
              <p className="text-center text-slate-500 text-xs mt-3 font-bold">
                Esta acción alertará a todos los residentes con alarma sonora.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE CONFIRMACIÓN (DOBLE CONTROL) */}
      {showEvacuationConfirm && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-slate-900 border-4 border-red-600 rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-600 animate-pulse-red"></div>
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-red-600 text-white rounded-full animate-bounce">
                <AlertOctagon size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white uppercase mb-2">
                  ¿CONFIRMA EVACUACIÓN?
                </h3>
                <p className="text-slate-300 text-sm font-medium">
                  Está a punto de desplegar el{" "}
                  <strong>Operativo de Evacuación</strong> por{" "}
                  <strong>{selectedEmergency?.label}</strong>. Esto activará
                  alarmas en todos los dispositivos.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <button
                  onClick={() => setShowEvacuationConfirm(false)}
                  className="py-4 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors uppercase text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={triggerEvacuation}
                  className="py-4 rounded-xl bg-red-600 text-white font-black hover:bg-red-700 transition-colors uppercase text-sm shadow-lg shadow-red-900/50"
                >
                  CONFIRMAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GuardLprPopup = ({ data, onClose, notify, addGlobalNotification }) => {
  if (!data) return null;
  const confirmEntry = () => {
    addGlobalNotification({
      type: "visit",
      title: "Visita Automática",
      message: `Ingreso autorizado por LPR: ${data.name}.`,
      priority: "normal",
    });
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4 pointer-events-none">
      <div className="bg-slate-900 border-l-8 border-emerald-500 rounded-r-lg shadow-2xl p-6 pointer-events-auto flex gap-6 max-w-lg w-full animate-fade-in-up relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ScanLine size={100} className="text-white" />
        </div>
        <div className="relative z-10">
          <div className="w-32 h-32 rounded-lg bg-slate-800 border-2 border-emerald-500 overflow-hidden relative shadow-lg">
            <img
              src={data.photo}
              alt="Detección"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-4 border-emerald-500/50 animate-pulse"></div>
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs font-black text-emerald-400 bg-emerald-900/50 px-2 py-1 rounded uppercase tracking-wider">
              Match {data.match}
            </span>
          </div>
        </div>
        <div className="flex-1 relative z-10 text-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-emerald-400 font-black text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
                <Zap size={14} className="fill-emerald-400" /> Detección
                Automática
              </h3>
              <h2 className="text-2xl font-bold leading-none">{data.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white"
            >
              <XCircle size={24} />
            </button>
          </div>
          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded">
              <Building size={18} className="text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">
                  Unidad
                </p>
                <p className="font-medium text-sm">{data.unit}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded">
              <Truck size={18} className="text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">
                  Vehículo
                </p>
                <p className="font-mono font-bold text-lg tracking-wider">
                  {data.plate}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={confirmEntry}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded uppercase tracking-wide transition-colors"
            >
              Confirmar Ingreso
            </button>
            <button
              onClick={() => {
                notify("Alerta de seguridad activada", "error");
                onClose();
              }}
              className="px-3 bg-slate-700 hover:bg-red-600 text-white rounded transition-colors"
            >
              <AlertTriangle size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GuardLprScreen = ({
  setScreen,
  triggerLprSimulation,
  addLog,
  notify,
}) => {
  const [events, setEvents] = useState([]);
  const [isLive, setIsLive] = useState(true);

  // Generador simple de eventos mock
  const generateMockEvent = () => {
    const plates = ["AE 123 BC", "AD 999 XX", "AB 456 CD", "AC 777 ZZ"];
    const types = ["Propietario", "Visita", "Proveedor"];
    const confidence = `${Math.floor(90 + Math.random() * 10)}%`;

    const e = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      plate: plates[Math.floor(Math.random() * plates.length)],
      type: types[Math.floor(Math.random() * types.length)],
      confidence,
    };

    // FIX: ...prev (no .prev)
    setEvents((prev) => [e, ...prev].slice(0, 6));

    notify?.(`Detección LPR: ${e.plate}`, "success");
    addLog?.("LPR", `Detección: ${e.plate} (${e.type}) conf. ${e.confidence}`);
  };

  // Stream “live” simulado
  useEffect(() => {
    if (!isLive) return;
    const t = setInterval(generateMockEvent, 6000);
    return () => clearInterval(t);
  }, [isLive]);

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 animate-fade-in-up">
      <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-4 shadow-sm">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setScreen("dashboard")}
        >
          <ArrowLeft className="w-4 h-4" /> VOLVER
        </Button>
        <h2 className="font-black text-xl text-slate-800">
          MONITOR CÁMARAS LPR
        </h2>
        <div className="ml-auto flex gap-2">
          <Button
            variant={isLive ? "secondary" : "primary"}
            size="sm"
            onClick={() => setIsLive((v) => !v)}
          >
            {isLive ? "PAUSAR" : "INICIAR"}
          </Button>
          <Button variant="primary" size="sm" onClick={triggerLprSimulation}>
            SIMULAR DETECCIÓN
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stream */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
          <div className="p-3 flex items-center justify-between text-white border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider">
              Cámara Principal • {isLive ? "EN VIVO" : "PAUSADO"}
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              REC:{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="aspect-video flex items-center justify-center text-slate-400 text-sm">
            (Stream simulado)
          </div>
        </div>

        {/* Detecciones */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-black text-sm uppercase tracking-wider">
              Detecciones Recientes
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              {events.length} eventos
            </span>
          </div>

          <div className="p-4 space-y-3">
            {events.length === 0 ? (
              <div className="text-slate-400 text-sm">Sin detecciones aún.</div>
            ) : (
              events.map((e) => (
                <div
                  key={e.id}
                  className="p-3 rounded-xl border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <div className="font-black text-slate-800">{e.plate}</div>
                    <div className="text-xs text-slate-500">
                      {e.type} • Conf: {e.confidence}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    {e.time}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GuardDashboard = ({
  currentUser,
  notify,
  onBack,
  setScreen,
  addGlobalNotification,
  openShiftReport,
  notifications,
}) => {
  // Calcular notificaciones no leídas
  const unreadCount = notifications
    ? notifications.filter((n) => !n.read).length
    : 0;
  // Calcular Tareas Pendientes
  const pendingTasks = TASKS_DB.filter((t) => t.status === "pending").length;

  // Efecto para avisar al guardia si hay tareas pendientes al entrar
  useEffect(() => {
    if (pendingTasks > 0) {
      notify(
        `Atención: Tienes ${pendingTasks} tareas pendientes de turnos anteriores.`,
        "warning"
      );
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans">
      <div className="h-20 px-6 bg-white border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-4">
          <BrandLogo />
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          <div>
            <h2 className="font-bold text-slate-800 text-sm tracking-wider uppercase">
              Puesto Principal
            </h2>
            <p className="text-xs text-orange-600 font-bold">
              {currentUser} • Turno Día
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {/* BELL ICON FOR NOTIFICATIONS */}
          <button
            onClick={() => setScreen("notifications")}
            className="p-2 rounded-full border border-slate-200 bg-white shadow-sm relative hover:bg-slate-50 transition-all mr-2"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>
          <Button variant="secondary" size="md" onClick={openShiftReport}>
            Cerrar turno
          </Button>
        </div>
      </div>
      <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6 flex-1 overflow-y-auto bg-slate-50">
        <button
          onClick={() => setScreen("supplier")}
          className="group bg-white hover:bg-orange-50 border-2 border-slate-200 hover:border-orange-500 p-6 rounded-2xl flex flex-col items-center gap-4 transition-all shadow-sm hover:shadow-md"
        >
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
            <Truck className="w-8 h-8 text-slate-600 group-hover:text-orange-600" />
          </div>
          <span className="font-black text-lg text-slate-700 group-hover:text-orange-700 uppercase tracking-tight">
            Ingreso Proveedores
          </span>
        </button>
        <button
          onClick={() => setScreen("package")}
          className="group bg-white hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-500 p-6 rounded-2xl flex flex-col items-center gap-4 transition-all shadow-sm hover:shadow-md"
        >
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
            <Package className="w-8 h-8 text-slate-600 group-hover:text-emerald-600" />
          </div>
          <span className="font-black text-lg text-slate-700 group-hover:text-emerald-700 uppercase tracking-tight">
            Paquetería
          </span>
        </button>
        <button
          onClick={() => setScreen("visits")}
          className="group bg-white hover:bg-purple-50 border-2 border-slate-200 hover:border-purple-500 p-6 rounded-2xl flex flex-col items-center gap-4 transition-all shadow-sm hover:shadow-md"
        >
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
            <UserPlus className="w-8 h-8 text-slate-600 group-hover:text-purple-600" />
          </div>
          <span className="font-black text-lg text-slate-700 group-hover:text-purple-700 uppercase tracking-tight">
            Control Visitas
          </span>
        </button>
        <button
          onClick={() => setScreen("rounds")}
          className="group bg-white hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-500 p-6 rounded-2xl flex flex-col items-center gap-4 transition-all shadow-sm hover:shadow-md"
        >
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <MapPin className="w-8 h-8 text-slate-600 group-hover:text-blue-600" />
          </div>
          <span className="font-black text-lg text-slate-700 group-hover:text-blue-700 uppercase tracking-tight">
            Rondas Activas
          </span>
        </button>
        <button
          onClick={() => setScreen("lpr")}
          className="group bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col items-center gap-4 transition-all shadow-lg hover:shadow-xl"
        >
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors border border-slate-700">
            <ScanLine className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300" />
          </div>
          <span className="font-black text-lg text-white group-hover:text-slate-100 uppercase tracking-tight">
            Ingreso LPR / Facial
          </span>
        </button>

        {/* NUEVO BOTÓN: TAREAS PENDIENTES */}
        <button
          onClick={() => setScreen("tasks")}
          className="group bg-white hover:bg-yellow-50 border-2 border-slate-200 hover:border-yellow-500 p-6 rounded-2xl flex flex-col items-center gap-4 transition-all shadow-sm hover:shadow-md relative"
        >
          {pendingTasks > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm animate-pulse">
              {pendingTasks}
            </div>
          )}
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
            <ClipboardList className="w-8 h-8 text-slate-600 group-hover:text-yellow-600" />
          </div>
          <span className="font-black text-lg text-slate-700 group-hover:text-yellow-700 uppercase tracking-tight">
            Tareas Pendientes
          </span>
        </button>

        {/* BOTÓN DE EMERGENCIAS */}
        <button
          onClick={() => setScreen("emergency")}
          className="group bg-red-600 hover:bg-red-700 border-2 border-red-500 hover:border-red-400 p-6 rounded-2xl flex flex-col items-center gap-4 transition-all shadow-lg hover:shadow-red-200 col-span-2 md:col-span-1"
        >
          <div className="w-16 h-16 rounded-full bg-red-500/30 border border-red-400/50 flex items-center justify-center group-hover:bg-red-500 transition-colors">
            <Siren className="w-8 h-8 text-white animate-pulse" />
          </div>
          <span className="font-black text-lg text-white uppercase tracking-tight">
            Emergencias
          </span>
        </button>
      </div>
    </div>
  );
};

const GuardView = ({
  onBack,
  currentUser,
  notify,
  addGlobalNotification,
  notifications,
  markAsRead,
  guardTasks,
  setGuardTasks,
  addLog,
  openShiftReport, // <-- NUEVO
}) => {
  const [screen, setScreen] = useState("dashboard");
  const [lprPopupData, setLprPopupData] = useState(null);

  const triggerLprSimulation = () => {
    const mockEvent = {
      name: "Carlos Ruiz",
      unit: "UF 505",
      plate: "AD 999 XX",
      photo: "https://placehold.co/150x150/e2e8f0/64748b?text=CR",
      match: "98%",
      type: "Propietario",
    };
    setLprPopupData(mockEvent);
  };

  return (
    <div className="h-full w-full relative">
      {screen === "dashboard" && (
        <GuardDashboard
          currentUser={currentUser}
          notify={notify}
          onBack={onBack}
          setScreen={setScreen}
          addGlobalNotification={addGlobalNotification}
          openShiftReport={openShiftReport} // <-- PASO DIRECTO
          notifications={notifications}
        />
      )}
      {screen === "supplier" && (
        <GuardSupplierWizard setScreen={setScreen} notify={notify} />
      )}
      {screen === "rounds" && (
        <GuardRoundsScreen
          setScreen={setScreen}
          notify={notify}
          addGlobalNotification={addGlobalNotification}
        />
      )}
      {screen === "tasks" && (
        <GuardTasksScreen
          setScreen={setScreen}
          notify={notify}
          addLog={addLog}
          tasks={guardTasks}
          setTasks={setGuardTasks}
        />
      )}

      {screen === "package" && (
        <GuardPackageScreen
          setScreen={setScreen}
          notify={notify}
          addLog={addLog}
          addGlobalNotification={addGlobalNotification}
          currentUser={currentUser}
        />
      )}

      {screen === "visits" && (
        <GuardVisitsScreen
          setScreen={setScreen}
          notify={notify}
          addGlobalNotification={addGlobalNotification}
        />
      )}
      {screen === "lpr" && (
        <GuardLprScreen
          setScreen={setScreen}
          triggerLprSimulation={triggerLprSimulation}
          addLog={addLog}
          notify={notify}
        />
      )}

      {screen === "emergency" && (
        <GuardEmergencyScreen
          setScreen={setScreen}
          notify={notify}
          addGlobalNotification={addGlobalNotification}
          addLog={addLog}
        />
      )}
      {screen === "notifications" && (
        <GuardNotificationCenter
          notifications={notifications}
          setScreen={setScreen}
          markAsRead={markAsRead}
        />
      )}

      {lprPopupData && (
        <GuardLprPopup
          data={lprPopupData}
          onClose={() => setLprPopupData(null)}
          notify={notify}
          addGlobalNotification={addGlobalNotification}
        />
      )}
    </div>
  );
};

const GuardVisitsScreen = ({ setScreen, notify, addGlobalNotification }) => {
  const [visitMode, setVisitMode] = useState("manual");
  const [visitorName, setVisitorName] = useState("");
  const [visitorLastName, setVisitorLastName] = useState("");
  const [visitorDNI, setVisitorDNI] = useState("");
  const [host, setHost] = useState(null);
  const [plate, setPlate] = useState("");
  const [occupantsCount, setOccupantsCount] = useState(1);
  const [identifyOthers, setIdentifyOthers] = useState(false);

  // 2. Aprobación Visita (Manual)
  const handleManualRegister = () => {
    notify(
      `INGRESO REGISTRADO\nVisita: ${visitorName} ${visitorLastName}\nDestino: ${host?.unit}`
    );
    addGlobalNotification({
      type: "visit",
      title: "Visita Ingresada",
      message: `La visita ${visitorName} ${visitorLastName} ha ingresado al barrio.`,
      priority: "normal",
    });
    setScreen("dashboard");
  };
  // 2. Aprobación Visita (QR)
  const handleAuthorizeEntry = (visit) => {
    notify(`AUTORIZACIÓN QR VALIDADA\nIngreso permitido a ${visit.visitor}`);
    addGlobalNotification({
      type: "visit",
      title: "Visita QR Ingresada",
      message: `Tu invitado ${visit.visitor} ha ingresado correctamente.`,
      priority: "normal",
    });
    setScreen("dashboard");
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800">
      <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setScreen("dashboard")}
          >
            <ArrowLeft className="w-4 h-4" /> VOLVER
          </Button>
          <h2 className="font-black text-xl text-slate-800 tracking-tight">
            CONTROL DE VISITAS
          </h2>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setVisitMode("manual")}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
              visitMode === "manual"
                ? "bg-white text-orange-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            REGISTRO MANUAL
          </button>
          <button
            onClick={() => setVisitMode("authorized")}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
              visitMode === "authorized"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            VISITAS AUTORIZADAS (QR)
          </button>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        {visitMode === "manual" ? (
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
            <h3 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-2">
              DATOS DE INGRESO
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-600">
                  Nombre
                </label>
                <input
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full p-3 border-2 border-slate-200 rounded-lg bg-slate-50 focus:border-orange-500 outline-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-600">
                  Apellido
                </label>
                <input
                  type="text"
                  value={visitorLastName}
                  onChange={(e) => setVisitorLastName(e.target.value)}
                  className="w-full p-3 border-2 border-slate-200 rounded-lg bg-slate-50 focus:border-orange-500 outline-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-600">
                  D.N.I. N°
                </label>
                <input
                  type="text"
                  value={visitorDNI}
                  onChange={(e) => setVisitorDNI(e.target.value)}
                  className="w-full p-3 border-2 border-slate-200 rounded-lg bg-slate-50 focus:border-orange-500 outline-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-600">
                  Dominio Vehículo
                </label>
                <input
                  type="text"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  className="w-full p-3 border-2 border-slate-200 rounded-lg bg-slate-50 focus:border-orange-500 outline-none font-bold uppercase"
                  placeholder="AAA-000"
                />
              </div>
            </div>
            <div className="mb-6">
              <ResidentSelector onSelect={setHost} selected={host} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-600">
                  Número de Ocupantes
                </label>
                <select
                  value={occupantsCount}
                  onChange={(e) => {
                    setOccupantsCount(parseInt(e.target.value));
                    if (e.target.value === "1") setIdentifyOthers(false);
                  }}
                  className="w-full p-3 border-2 border-slate-200 rounded-lg bg-white focus:border-orange-500 outline-none font-bold cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 flex flex-col justify-end pb-1">
                {occupantsCount > 1 && (
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => setIdentifyOthers(!identifyOthers)}
                      className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${
                        identifyOthers ? "bg-orange-600" : "bg-slate-300"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          identifyOthers ? "left-7" : "left-1"
                        }`}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                      ¿Identificar Acompañantes?
                    </span>
                  </div>
                )}
              </div>
            </div>
            {identifyOthers && occupantsCount > 1 && (
              <div className="mb-8 space-y-4">
                <h4 className="text-sm font-black text-slate-500 uppercase border-b border-slate-200 pb-1">
                  Datos de Acompañantes
                </h4>
                {Array.from({ length: occupantsCount - 1 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 bg-orange-50 p-3 rounded-lg border border-orange-100"
                  >
                    <div className="flex items-center gap-2 col-span-2">
                      <span className="bg-orange-200 text-orange-800 text-xs font-bold px-2 py-0.5 rounded-full">
                        Acompañante {index + 1}
                      </span>
                    </div>
                    <input
                      placeholder="Apellido"
                      className="p-2 text-sm border border-orange-200 rounded focus:border-orange-500 outline-none"
                    />
                    <input
                      placeholder="DNI"
                      className="p-2 text-sm border border-orange-200 rounded focus:border-orange-500 outline-none"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between border-t border-slate-100 pt-6">
              <div className="text-xs font-bold text-slate-400">
                HORA:{" "}
                <span className="text-slate-800">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <Button
                onClick={handleManualRegister}
                size="lg"
                disabled={!host || !visitorName}
              >
                REGISTRAR INGRESO
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUTHORIZED_VISITS_DB.map((visit) => (
              <div
                key={visit.id}
                className="bg-white border-l-4 border-l-emerald-500 rounded-lg shadow-md p-5 hover:shadow-xl transition-shadow relative"
              >
                <div className="absolute top-4 right-4 text-emerald-600">
                  <QrCode size={32} />
                </div>
                <h4 className="font-black text-lg text-slate-800 mb-1">
                  {visit.visitor}
                </h4>
                <p className="text-sm text-slate-500 font-bold mb-4">
                  DNI: {visit.dni}
                </p>
                <div className="space-y-2 text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <User size={14} />{" "}
                    <span className="font-medium">Visita a: {visit.host}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} />{" "}
                    <span>Ocupantes: {visit.occupants}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={14} />{" "}
                    <span className="uppercase text-xs font-bold bg-slate-100 px-2 rounded">
                      Patente: {visit.plate}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="success"
                  className="w-full"
                  onClick={() => handleAuthorizeEntry(visit)}
                >
                  VALIDAR INGRESO
                </Button>
              </div>
            ))}
            <div
              className="border-2 border-dashed border-slate-300 rounded-lg p-5 flex flex-col items-center justify-center text-slate-400 hover:border-orange-500 hover:text-orange-500 cursor-pointer transition-colors h-full min-h-[200px]"
              onClick={() =>
                notify("Simulación: Cámara activada para escanear QR", "info")
              }
            >
              <Camera size={40} className="mb-2" />
              <span className="font-bold">ESCANEAR QR</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ResidentNotificationCenter = ({
  notifications,
  setActiveScreen,
  markAsRead,
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800">
      <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-4 shadow-sm">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setActiveScreen("home")}
        >
          <ArrowLeft className="w-4 h-4" /> VOLVER
        </Button>
        <h2 className="font-black text-xl text-slate-800 tracking-tight">
          NOTIFICACIONES
        </h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Bell size={48} className="mb-2 opacity-20" />
            <p>No tienes notificaciones</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white p-4 rounded-xl border-l-4 shadow-sm relative overflow-hidden transition-all ${
                notif.read ? "border-slate-300 opacity-70" : "border-orange-500"
              }`}
            >
              {notif.priority === "critical" && (
                <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>
              )}
              <div className="flex justify-between items-start mb-1 relative z-10">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    notif.priority === "critical"
                      ? "bg-red-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {notif.priority === "critical"
                    ? "ALERTA CRÍTICA"
                    : notif.type === "package"
                    ? "PAQUETERÍA"
                    : notif.type === "visit"
                    ? "VISITAS"
                    : "GENERAL"}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">
                  {notif.date}
                </span>
              </div>
              <h3
                className={`font-bold text-sm mb-1 ${
                  notif.priority === "critical"
                    ? "text-red-600"
                    : "text-slate-800"
                }`}
              >
                {notif.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                {notif.message}
              </p>
              {!notif.read && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="text-[10px] font-bold text-orange-600 uppercase hover:underline"
                >
                  Marcar como leído
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const ResidentServiceNoticeScreen = ({ setActiveScreen, notify }) => {
  const [serviceType, setServiceType] = useState("supplier");
  const [supplierCategory, setSupplierCategory] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [deliveryPlatform, setDeliveryPlatform] = useState("");
  const [otherPlatform, setOtherPlatform] = useState("");
  const [storeName, setStoreName] = useState("");

  const handleSubmit = () => {
    let message = "";
    if (serviceType === "supplier") {
      message = `AVISO ENVIADO AL GUARDIA\nEsperando Proveedor: ${supplierName}\nRubro: ${supplierCategory}`;
    } else {
      const platform =
        deliveryPlatform === "Otro" ? otherPlatform : deliveryPlatform;
      message = `AVISO ENVIADO AL GUARDIA\nEsperando Delivery de: ${storeName}\nTrae: ${platform}`;
    }
    notify(message);
    setActiveScreen("home");
  };

  return (
    <div className="p-4 bg-white h-full overflow-y-auto flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setActiveScreen("home")}
          className="p-2 bg-slate-100 rounded-full"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h2 className="font-black text-xl text-slate-800">AVISO A GUARDIA</h2>
      </div>
      <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
        <button
          onClick={() => setServiceType("supplier")}
          className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            serviceType === "supplier"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-slate-500"
          }`}
        >
          <Truck size={18} /> Proveedor
        </button>
        <button
          onClick={() => setServiceType("delivery")}
          className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            serviceType === "delivery"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-slate-500"
          }`}
        >
          <Bike size={18} /> Delivery
        </button>
      </div>
      <div className="flex-1 space-y-6">
        {serviceType === "supplier" ? (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">
                Rubro / Servicio
              </label>
              <select
                value={supplierCategory}
                onChange={(e) => setSupplierCategory(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-500"
              >
                <option value="">Seleccione...</option>
                {SERVICE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">
                Nombre Empresa / Profesional
              </label>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-500"
                placeholder="Ej: Plomero Juan"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">
                Plataforma de Delivery
              </label>
              <select
                value={deliveryPlatform}
                onChange={(e) => setDeliveryPlatform(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-500"
              >
                <option value="">Seleccione...</option>
                {DELIVERY_PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            {deliveryPlatform === "Otro" && (
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-2">
                  Especifique Plataforma/Empresa
                </label>
                <input
                  type="text"
                  value={otherPlatform}
                  onChange={(e) => setOtherPlatform(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-500"
                  placeholder="Nombre empresa"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">
                Local / Restaurante (Origen)
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-500"
                placeholder="Ej: McDonald's, Farmacity"
              />
            </div>
          </div>
        )}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
          <Activity className="text-blue-600 flex-shrink-0 mt-1" size={20} />
          <p className="text-xs text-blue-800 leading-relaxed">
            <strong>Nota:</strong> Esta información llegará al Guardia como una
            alerta prioritaria. El personal de seguridad validará identidad pero
            agilizará el ingreso.
          </p>
        </div>
        <Button
          size="lg"
          className="w-full shadow-xl mt-4"
          onClick={handleSubmit}
          disabled={
            serviceType === "supplier"
              ? !supplierCategory || !supplierName
              : !deliveryPlatform || !storeName
          }
        >
          ENVIAR AVISO A GUARDIA
        </Button>
      </div>
    </div>
  );
};

const ResidentNewVisitScreen = ({ setActiveScreen, notify }) => {
  const [step, setStep] = useState(1);
  const [occupants, setOccupants] = useState(1);
  const [additionalGuests, setAdditionalGuests] = useState([]);

  useEffect(() => {
    if (occupants > 1) {
      const needed = occupants - 1;
      setAdditionalGuests((prev) => {
        const newGuests = [...prev];
        if (newGuests.length < needed) {
          for (let i = newGuests.length; i < needed; i++) {
            newGuests.push({ name: "", lastName: "", dni: "" });
          }
        } else if (newGuests.length > needed) {
          return newGuests.slice(0, needed);
        }
        return newGuests;
      });
    } else {
      setAdditionalGuests([]);
    }
  }, [occupants]);

  const updateGuest = (index, field, value) => {
    const updated = [...additionalGuests];
    updated[index][field] = value;
    setAdditionalGuests(updated);
  };

  return (
    <div className="p-4 bg-white h-full overflow-y-auto flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setActiveScreen("home")}
          className="p-2 bg-slate-100 rounded-full"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h2 className="font-black text-xl text-slate-800">NUEVA VISITA</h2>
      </div>
      {step === 1 ? (
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500">
              Nombre del Invitado Principal
            </label>
            <input
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-500"
              placeholder="Ej: Roberto Gomez"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">
                DNI
              </label>
              <input
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-500"
                placeholder="Número"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">
                Patente
              </label>
              <input
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-500 uppercase"
                placeholder="AAA-000"
              />
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase text-slate-500">
                Ocupantes Totales
              </label>
              <span className="text-xl font-black text-orange-600">
                {occupants}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={occupants}
              onChange={(e) => setOccupants(parseInt(e.target.value))}
              className="w-full accent-orange-600"
            />
          </div>
          {occupants > 1 && (
            <div className="space-y-4 animate-fade-in-up">
              <h3 className="text-sm font-black text-slate-700 uppercase border-b border-slate-200 pb-2">
                Datos Acompañantes
              </h3>
              {additionalGuests.map((guest, idx) => (
                <div
                  key={idx}
                  className="bg-orange-50 p-4 rounded-xl border border-orange-100 space-y-3"
                >
                  <p className="text-xs font-bold text-orange-700 uppercase">
                    Acompañante {idx + 1}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="Nombre"
                      value={guest.name}
                      onChange={(e) => updateGuest(idx, "name", e.target.value)}
                      className="p-3 bg-white border border-orange-200 rounded-lg text-sm outline-none focus:border-orange-500"
                    />
                    <input
                      placeholder="Apellido"
                      value={guest.lastName}
                      onChange={(e) =>
                        updateGuest(idx, "lastName", e.target.value)
                      }
                      className="p-3 bg-white border border-orange-200 rounded-lg text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                  <input
                    placeholder="DNI N°"
                    value={guest.dni}
                    onChange={(e) => updateGuest(idx, "dni", e.target.value)}
                    className="w-full p-3 bg-white border border-orange-200 rounded-lg text-sm outline-none focus:border-orange-500"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="pt-4">
            <Button
              size="lg"
              className="w-full shadow-xl"
              onClick={() => setStep(2)}
            >
              GENERAR AUTORIZACIÓN
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
          <div className="text-center space-y-2">
            <CheckCircle size={48} className="text-emerald-500 mx-auto" />
            <h3 className="text-2xl font-black text-slate-800">¡LISTO!</h3>
            <p className="text-slate-500">
              Autorización generada correctamente
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-slate-100 flex flex-col items-center">
            <QrCode size={200} className="text-slate-800 mb-4" />
            <p className="font-mono text-xs text-slate-400">
              TOKEN: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
          <div className="w-full space-y-3">
            <Button
              variant="success"
              className="w-full"
              onClick={() => notify("Simulación: Abriendo WhatsApp...", "info")}
            >
              COMPARTIR POR WHATSAPP
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                setStep(1);
                setActiveScreen("home");
              }}
            >
              VOLVER AL INICIO
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const ResidentAmenitiesScreen = ({
  setActiveScreen,
  notify,
  addGlobalNotification,
}) => {
  // 4. Recordatorios de Reservas
  const handleBooking = (slot) => {
    notify(
      "Reserva Confirmada.\nSe ha enviado notificación a la Administración."
    );
    addGlobalNotification({
      type: "amenity",
      title: "Reserva Exitosa",
      message: `Has reservado el SUM para el horario: ${slot.time}.`,
      priority: "normal",
    });
  };
  // Gestión de fechas
  const [currentDate, setCurrentDate] = useState(null);
  const [slots, setSlots] = useState(AMENITIES_BASE_SLOTS);

  const handleDateSelect = (date) => {
    setCurrentDate(date);
    const booked = RESERVATIONS_DB[date] || [];
    const updatedSlots = AMENITIES_BASE_SLOTS.map((slot) => ({
      ...slot,
      status: booked.includes(slot.id) ? "booked" : "available",
    }));
    setSlots(updatedSlots);
  };

  const handleConfirmBooking = (slot) => {
    const booked = RESERVATIONS_DB[currentDate] || [];
    RESERVATIONS_DB[currentDate] = [...booked, slot.id];
    const updatedSlots = slots.map((s) =>
      s.id === slot.id ? { ...s, status: "booked" } : s
    );
    setSlots(updatedSlots);
    handleBooking(slot);
  };

  return (
    <div className="p-4 bg-white h-full overflow-y-auto flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setActiveScreen("home")}
          className="p-2 bg-slate-100 rounded-full"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h2 className="font-black text-xl text-slate-800">RESERVAR SUM</h2>
      </div>
      <div className="flex-1 space-y-6">
        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-center gap-4">
          <CalendarCheck className="text-orange-600" size={32} />
          <div>
            <h4 className="font-bold text-slate-800">
              Salón de Usos Múltiples
            </h4>
            <p className="text-xs text-slate-500">Capacidad: 50 personas</p>
          </div>
        </div>
        <SimpleCalendar
          selectedDate={currentDate}
          onDateSelect={handleDateSelect}
          bookedDates={RESERVATIONS_DB}
        />
        {currentDate && (
          <div className="space-y-4 animate-fade-in-up">
            <h3 className="text-sm font-bold text-slate-600 uppercase">
              Horarios para el {currentDate}
            </h3>
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 rounded-lg border-2 flex justify-between items-center ${
                  slot.status === "available"
                    ? "border-slate-100 bg-white"
                    : "border-slate-100 bg-slate-50 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-slate-400" />
                  <span
                    className={`font-bold ${
                      slot.status === "available"
                        ? "text-slate-800"
                        : "text-slate-400 line-through"
                    }`}
                  >
                    {slot.time}
                  </span>
                </div>
                {slot.status === "available" ? (
                  <button
                    onClick={() => handleConfirmBooking(slot)}
                    className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded hover:bg-emerald-200"
                  >
                    RESERVAR
                  </button>
                ) : (
                  <span className="text-xs font-bold text-red-400">
                    OCUPADO
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        {!currentDate && (
          <div className="text-center text-slate-400 text-sm py-4 italic">
            Seleccione una fecha para ver disponibilidad.
          </div>
        )}
      </div>
    </div>
  );
};

const ResidentHomeTab = ({
  setActiveScreen,
  notify,
  notifications,
  onLogout,
  addGlobalNotification,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const hasCritical = notifications.some(
    (n) => n.priority === "critical" && !n.read
  );

  // NUEVO: SOS AHORA ENVÍA UBICACIÓN
  const handleSOS = () => {
    const mockLocation = MOCK_COORDINATES["UF 402"] || { x: 50, y: 50 }; // Simular GPS de la unidad del usuario logueado
    addGlobalNotification({
      type: "alert",
      priority: "critical",
      title: "ALERTA SOS - UF 402",
      message: "El residente de la UF 402 ha activado el botón de pánico.",
      color: "red",
      location: mockLocation,
    });
    notify("SOS Enviado a Guardia y Central de Monitoreo", "error");
  };

  return (
    <div className="p-4 space-y-6 pb-24 bg-white h-full overflow-y-auto">
      {/* Header con Campana de Notificaciones y Botón de Cerrar Sesión */}
      <div className="flex justify-between items-start pt-2">
        <div>
          <BrandLogo />
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest pl-1 font-bold">
            Barrio Los Robles
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveScreen("notifications")}
            className={`p-2 rounded-full border shadow-sm relative transition-all ${
              hasCritical
                ? "bg-red-50 border-red-200 animate-pulse-red"
                : "bg-slate-50 border-slate-100"
            }`}
          >
            <Bell
              className={`w-6 h-6 ${
                hasCritical ? "text-red-600" : "text-slate-600"
              }`}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={onLogout}
            className="bg-slate-50 p-2 rounded-full border border-slate-100 shadow-sm text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Cerrar Sesión"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-white opacity-10 transform rotate-12">
          <Shield size={120} />
        </div>
        <h3 className="text-slate-300 text-xs uppercase tracking-wider mb-1 font-bold">
          Bienvenido
        </h3>
        <h2 className="text-2xl font-black mb-4">Prop.</h2>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/30">
            ACCESO ACTIVO
          </span>
          <span className="px-2 py-1 bg-white/10 text-slate-300 text-[10px] font-bold rounded border border-white/10">
            UF 402
          </span>
        </div>
      </div>

      {/* Alerta visible si hay evento crítico */}
      {hasCritical && (
        <div
          className="bg-red-600 text-white p-4 rounded-xl shadow-lg animate-pulse flex items-center gap-3 border-2 border-red-400"
          onClick={() => setActiveScreen("notifications")}
        >
          <AlertTriangle size={32} />
          <div>
            <h3 className="font-black text-lg">¡ALERTA EN CURSO!</h3>
            <p className="text-xs font-medium">
              Toque para ver instrucciones de emergencia.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-100">
        <div
          className="bg-red-600 rounded-lg p-5 relative overflow-hidden group cursor-pointer shadow-lg shadow-red-100 active:scale-95 transition-transform"
          onClick={handleSOS}
        >
          <div className="flex items-center justify-between relative z-10 text-white">
            <div>
              <h3 className="font-black text-lg italic tracking-tight">
                SOS / EMERGENCIA
              </h3>
              <p className="text-red-100 text-xs font-medium">
                Enviar alerta geolocalizada
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-full animate-pulse">
              <AlertTriangle size={28} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveScreen("new_visit")}
          className="bg-white p-5 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 flex flex-col justify-between h-36 active:scale-95 transition-all group hover:border-orange-500 border-2 border-transparent"
        >
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <UserPlus size={20} />
          </div>
          <div className="text-left">
            <span className="block font-black text-slate-800 text-lg group-hover:text-orange-600">
              Nueva Visita
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Generar QR
            </span>
          </div>
        </button>
        <button
          onClick={() => setActiveScreen("amenities")}
          className="bg-white p-5 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 flex flex-col justify-between h-36 active:scale-95 transition-all group hover:border-orange-500 border-2 border-transparent"
        >
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors">
            <Calendar size={20} />
          </div>
          <div className="text-left">
            <span className="block font-black text-slate-800 text-lg group-hover:text-slate-700">
              Reservas
            </span>
            <span className="text-xs text-slate-500 font-medium">
              SUM y Espacios
            </span>
          </div>
        </button>
        <button
          onClick={() => setActiveScreen("service_notice")}
          className="col-span-2 bg-slate-800 p-5 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-700 flex flex-row items-center justify-between h-24 active:scale-95 transition-all group hover:bg-slate-900"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-orange-500">
              <Truck size={24} />
            </div>
            <div className="text-left">
              <span className="block font-black text-white text-lg">
                Avisar a Guardia
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Proveedor o Delivery en camino
              </span>
            </div>
          </div>
          <ChevronRight className="text-slate-500 group-hover:text-white" />
        </button>
      </div>
      <div>
        <h3 className="font-bold text-slate-400 mb-3 text-xs uppercase tracking-wider">
          Gestión Comunidad
        </h3>
        <div className="space-y-3">
          <button
            onClick={() =>
              notify("Alerta de Mascota enviada a toda la comunidad", "info")
            }
            className="w-full bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-orange-200 transition-colors"
          >
            <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
              <Dog size={20} />
            </div>
            <div className="text-left flex-1">
              <span className="font-bold text-slate-700 block text-sm">
                Mascotas
              </span>
              <span className="text-xs text-slate-400">Reportar extravío</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>
          <button
            onClick={() => notify("Formulario de Reclamos abierto", "info")}
            className="w-full bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-orange-200 transition-colors"
          >
            <div className="bg-slate-50 p-2 rounded-lg text-slate-600">
              <FileText size={20} />
            </div>
            <div className="text-left flex-1">
              <span className="font-bold text-slate-700 block text-sm">
                Reclamos
              </span>
              <span className="text-xs text-slate-400">Mantenimiento</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

const EmergencyOverlay = ({ notifications, setActiveScreen }) => {
  // Buscar la notificación de emergencia más reciente y no leída
  const activeEmergency = notifications.find(
    (n) => (n.priority === "critical" || n.type === "alert") && !n.read
  );
  const [showMap, setShowMap] = useState(false);

  if (!activeEmergency) return null;

  const isRed =
    activeEmergency.color === "red" || activeEmergency.priority === "critical";
  const bgColor = isRed ? "bg-red-600" : "bg-orange-500";
  const borderColor = isRed ? "border-red-400" : "border-orange-400";
  const animateClass = isRed ? "animate-pulse-red" : "animate-pulse-orange";

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 pointer-events-none">
      <div
        className={`w-full max-w-sm ${bgColor} rounded-2xl p-6 shadow-2xl border-4 ${borderColor} ${animateClass} pointer-events-auto transform transition-all duration-500 translate-y-0`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/20 rounded-full">
            {isRed ? (
              <Flame size={32} className="text-white" />
            ) : (
              <AlertTriangle size={32} className="text-white" />
            )}
          </div>
          {/* Botón de cerrar / ver detalles */}
          <div className="text-right">
            <button
              onClick={() => setActiveScreen("notifications")}
              className="text-white/80 hover:text-white text-xs font-bold underline block mb-1"
            >
              VER DETALLES
            </button>
          </div>
        </div>

        <h3 className="text-2xl font-black text-white uppercase leading-none mb-2">
          {activeEmergency.title}
        </h3>
        <p className="text-white/90 font-medium text-sm leading-relaxed mb-6">
          {activeEmergency.message}
        </p>

        {/* Visualización del Mapa si hay coordenadas */}
        {activeEmergency.location && (
          <div className="mb-4">
            <button
              onClick={() => setShowMap(!showMap)}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 mb-2 transition-colors text-sm uppercase"
            >
              {showMap ? <X size={16} /> : <MapPin size={16} />}
              {showMap ? "Ocultar Mapa" : "Ver Ubicación en Mapa"}
            </button>
            {showMap && <LocationMap location={activeEmergency.location} />}
          </div>
        )}

        <div className="bg-black/20 rounded-lg p-3 text-center">
          <p className="text-xs text-white/70 font-bold uppercase tracking-widest">
            Protocolo Activo
          </p>
        </div>
      </div>
    </div>
  );
};

const ResidentView = ({
  onBack,
  notify,
  notifications,
  markAsRead,
  addGlobalNotification,
}) => {
  const [activeScreen, setActiveScreen] = useState("home");

  return (
    <>
      <EmergencyOverlay
        notifications={notifications}
        setActiveScreen={setActiveScreen}
      />
      {activeScreen === "service_notice" ? (
        <ResidentServiceNoticeScreen
          setActiveScreen={setActiveScreen}
          notify={notify}
        />
      ) : activeScreen === "new_visit" ? (
        <ResidentNewVisitScreen
          setActiveScreen={setActiveScreen}
          notify={notify}
        />
      ) : activeScreen === "amenities" ? (
        <ResidentAmenitiesScreen
          setActiveScreen={setActiveScreen}
          notify={notify}
          addGlobalNotification={addGlobalNotification}
        />
      ) : activeScreen === "notifications" ? (
        <ResidentNotificationCenter
          notifications={notifications}
          setActiveScreen={setActiveScreen}
          markAsRead={markAsRead}
        />
      ) : (
        <ResidentHomeTab
          setActiveScreen={setActiveScreen}
          notify={notify}
          notifications={notifications}
          onLogout={onBack}
          addGlobalNotification={addGlobalNotification}
        />
      )}
    </>
  );
};

// --- AUTH SCREEN ---
const LoginScreen = ({ role, onLoginSuccess, onBack }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const validCreds = CREDENTIALS[role];
    if (username === validCreds.user && password === validCreds.pass) {
      onLoginSuccess(validCreds.name);
    } else {
      setError("Credenciales inválidas. Intente nuevamente.");
    }
  };

  const getRoleTexts = () => {
    switch (role) {
      case "guard":
        return { title: "ACCESO OPERATIVO", subtitle: "Guardias de Seguridad" };
      case "resident":
        return { title: "ACCESO RESIDENTES", subtitle: "Bienvenido a Casa" };
      case "localAdmin":
        return {
          title: "ADMINISTRACIÓN LOCAL",
          subtitle: "Gestión del Barrio",
        };
      case "admin":
        return { title: "SUPER ADMIN", subtitle: "Gestión Global del Sistema" };
      default:
        return { title: "LOGIN", subtitle: "" };
    }
  };
  const texts = getRoleTexts();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute top-0 w-full h-2 bg-orange-600"></div>
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-orange-50 rounded-full blur-3xl z-0"></div>
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl border border-slate-100 relative z-10">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="text-center mb-10 mt-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner">
              {role === "guard" && (
                <Shield size={48} className="text-orange-600" />
              )}
              {role === "resident" && (
                <User size={48} className="text-orange-600" />
              )}
              {role === "localAdmin" && (
                <Building size={48} className="text-orange-600" />
              )}
              {role === "admin" && (
                <BarChart3 size={48} className="text-orange-600" />
              )}
            </div>
          </div>
          <BrandLogo />
          <h2 className="text-xl font-black uppercase tracking-wide text-slate-800 mt-4">
            {texts.title}
          </h2>
          <p className="text-sm text-slate-500 font-medium">{texts.subtitle}</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:border-orange-500 outline-none transition-all"
                placeholder="Usuario"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Contraseña
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:border-orange-500 outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-center gap-3 font-medium rounded-r">
              <AlertTriangle size={18} /> {error}
            </div>
          )}
          <Button
            variant="primary"
            className="w-full py-4 text-base shadow-xl shadow-orange-200"
          >
            INGRESAR AHORA
          </Button>
        </form>
      </div>
      <p className="mt-8 text-slate-400 text-xs font-medium">
        © 2026 Blindaje S.A.
      </p>
    </div>
  );
};

const LocalAdminView = ({
  onBack,
  currentUser,
  notify,
  addGlobalNotification,
  notifications,
  markAsRead,
}) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [residents, setResidents] = useState(RESIDENTS_DB);

  const SidebarItem = ({ icon: Icon, label, tabId }) => (
    <div
      onClick={() => setActiveTab(tabId)}
      className={`p-3 flex items-center gap-3 cursor-pointer transition-all font-medium rounded-lg mb-1 ${
        activeTab === tabId
          ? "bg-orange-50 text-orange-700 border-l-4 border-orange-600"
          : "hover:bg-slate-50 hover:text-slate-900 text-slate-500 border-l-4 border-transparent"
      }`}
    >
      <Icon size={20} /> <span>{label}</span>
    </div>
  );

  const sendBroadcast = () => {
    addGlobalNotification({
      type: "alert",
      title: "Aviso de Administración",
      message: "Se informa corte programado de agua de 14 a 16hs.",
      priority: "normal",
    });
    notify("Comunicado enviado a todos los residentes", "info");
  };

  return (
    <div className="h-full bg-slate-50 flex flex-col md:flex-row font-sans relative">
      {/* OVERLAY PARA ADMIN LOCAL */}
      <EmergencyOverlay
        notifications={notifications}
        setActiveScreen={(target) => {
          // Si el overlay pide "ver detalles" (notifications), mandamos al tab de incidentes
          if (target === "notifications") setActiveTab("incidents");
        }}
      />

      <div className="w-full md:w-64 bg-white border-r border-slate-200 text-slate-600 flex flex-col z-20">
        <div className="p-6 border-b border-slate-100">
          <BrandLogo />
        </div>
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Propiedad
          </p>
          <h3 className="font-black text-slate-800 text-lg leading-tight">
            Barrio Privado
            <br />
            Los Robles
          </h3>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">
            Módulos de Gestión
          </p>
          <SidebarItem
            icon={FileBarChart}
            label="Dashboard"
            tabId="dashboard"
          />
          <SidebarItem icon={Users} label="Gestión Usuarios" tabId="users" />
          <SidebarItem icon={Users} label="Visitas" tabId="visits" />
          <SidebarItem icon={Truck} label="Proveedores" tabId="suppliers" />
          <SidebarItem
            icon={AlertTriangle}
            label="Incidentes"
            tabId="incidents"
          />
          <SidebarItem
            icon={CalendarCheck}
            label="Reservas SUM"
            tabId="reservations"
          />
          <SidebarItem icon={FileText} label="Reportes" tabId="reports" />
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center font-bold text-white shadow-md">
              GL
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700">Gerencia</p>
              <p className="text-[10px] text-slate-400">Administrador Local</p>
            </div>
          </div>
          <Button
            variant="secondary"
            className="w-full"
            onClick={onBack}
            size="sm"
          >
            <LogOut size={14} /> Cerrar Sesión
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              {activeTab === "dashboard"
                ? "Resumen Operativo"
                : activeTab === "users"
                ? "Gestión de Residentes"
                : activeTab === "reports"
                ? "Centro de Reportes"
                : activeTab}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Vista de Administración Local • {new Date().toLocaleDateString()}
            </p>
          </div>
          {activeTab !== "reports" && activeTab !== "users" && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Search size={16} /> Buscar
              </Button>
              <Button variant="primary" size="sm" onClick={sendBroadcast}>
                <Send size={16} /> Enviar Comunicado
              </Button>
            </div>
          )}
        </header>
        {activeTab === "users" && (
          <ResidentManagementScreen
            residents={residents}
            setResidents={setResidents}
            notify={notify}
          />
        )}
        {activeTab === "reports" && <ReportsModule notify={notify} />}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-5 border-l-4 border-l-orange-500">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-slate-500 text-xs font-bold uppercase">
                    Visitas Hoy
                  </p>
                  <Users size={18} className="text-orange-500" />
                </div>
                <h3 className="text-3xl font-black text-slate-800">142</h3>
                <p className="text-xs text-emerald-600 mt-1 font-bold">
                  En curso: 12
                </p>
              </Card>
              <Card className="p-5 border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-slate-500 text-xs font-bold uppercase">
                    Proveedores
                  </p>
                  <Truck size={18} className="text-blue-500" />
                </div>
                <h3 className="text-3xl font-black text-slate-800">8</h3>
                <p className="text-xs text-slate-400 mt-1 font-bold">
                  Ingresados hoy
                </p>
              </Card>
              <Card className="p-5 border-l-4 border-l-red-500">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-slate-500 text-xs font-bold uppercase">
                    Incidentes
                  </p>
                  <AlertTriangle size={18} className="text-red-500" />
                </div>
                <h3 className="text-3xl font-black text-slate-800">3</h3>
                <p className="text-xs text-red-600 mt-1 font-bold">
                  1 Alta Prioridad
                </p>
              </Card>
              <Card className="p-5 border-l-4 border-l-emerald-500">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-slate-500 text-xs font-bold uppercase">
                    SUM
                  </p>
                  <CalendarCheck size={18} className="text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black text-slate-800">1</h3>
                <p className="text-xs text-slate-400 mt-1 font-bold">
                  Reserva activa
                </p>
              </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-0">
                <div className="px-6 py-4 border-b border-slate-100 bg-white">
                  <h3 className="font-bold text-sm text-slate-800 uppercase">
                    Actividad Reciente
                  </h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {AUTHORIZED_VISITS_DB.slice(0, 3).map((visit) => (
                    <div
                      key={visit.id}
                      className="px-6 py-3 flex justify-between items-center hover:bg-slate-50"
                    >
                      <div>
                        <p className="font-bold text-sm text-slate-700">
                          Ingreso Visita: {visit.visitor}
                        </p>
                        <p className="text-xs text-slate-500">
                          A unidad: {visit.host}
                        </p>
                      </div>
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                        {visit.time}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-0">
                <div className="px-6 py-4 border-b border-slate-100 bg-white">
                  <h3 className="font-bold text-sm text-slate-800 uppercase">
                    Novedades de Guardia
                  </h3>
                </div>
                <div className="p-6 text-center text-slate-400 text-sm italic">
                  No hay novedades críticas reportadas en la última hora.
                </div>
              </Card>
            </div>
          </div>
        )}
        {activeTab === "visits" && (
          <Card className="p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
                <tr>
                  <th className="px-6 py-3">Hora</th>
                  <th className="px-6 py-3">Visitante</th>
                  <th className="px-6 py-3">DNI</th>
                  <th className="px-6 py-3">Destino</th>
                  <th className="px-6 py-3">Patente</th>
                  <th className="px-6 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {AUTHORIZED_VISITS_DB.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-slate-500">
                      {v.time}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700">
                      {v.visitor}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{v.dni}</td>
                    <td className="px-6 py-4 text-slate-600">{v.host}</td>
                    <td className="px-6 py-4 uppercase font-mono text-slate-500">
                      {v.plate}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          v.status === "Ingresó"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
        {activeTab === "suppliers" && (
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <input
                className="p-2 border rounded-lg text-sm w-64"
                placeholder="Buscar proveedor..."
              />
              <Button size="sm" variant="secondary">
                Filtrar
              </Button>
            </div>
            <Card className="p-0">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
                  <tr>
                    <th className="px-6 py-3">Empresa</th>
                    <th className="px-6 py-3">Personal</th>
                    <th className="px-6 py-3">Rubro</th>
                    <th className="px-6 py-3">Servicio</th>
                    <th className="px-6 py-3">Patente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SUPPLIERS_DB.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-700">
                        {s.company}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {s.name}
                        <br />
                        <span className="text-xs text-slate-400">
                          DNI: {s.dni}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                          {s.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {s.serviceType || "-"}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-500 uppercase">
                        {s.plate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}
        {activeTab === "incidents" && (
          <div className="grid grid-cols-1 gap-4">
            {INCIDENTS_DB.map((inc) => (
              <Card
                key={inc.id}
                className="p-4 border-l-4 border-l-red-500 flex justify-between items-center"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-50 rounded-full text-red-600">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">
                      {inc.type}
                    </h4>
                    <p className="text-slate-600">{inc.detail}</p>
                    <div className="flex gap-3 mt-2 text-xs text-slate-500 font-bold uppercase">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {inc.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {inc.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                      inc.status === "Resuelto"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {inc.status}
                  </span>
                  <p className="text-xs text-slate-400 mt-2 font-bold uppercase">
                    Prioridad {inc.severity}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
        {activeTab === "reservations" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                  <CalendarCheck size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Estado del S.U.M.
                  </h3>
                  <p className="text-slate-500">
                    Capacidad: 50 Personas • Limpieza incluida
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AMENITIES_SLOTS.map((slot, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 flex justify-between items-center ${
                      slot.status === "booked"
                        ? "border-red-100 bg-red-50"
                        : "border-emerald-100 bg-emerald-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock
                        size={20}
                        className={
                          slot.status === "booked"
                            ? "text-red-400"
                            : "text-emerald-500"
                        }
                      />
                      <span className="font-bold text-slate-700 text-lg">
                        {slot.time}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-black uppercase px-2 py-1 rounded ${
                          slot.status === "booked"
                            ? "bg-red-200 text-red-800"
                            : "bg-emerald-200 text-emerald-800"
                        }`}
                      >
                        {slot.status === "booked" ? "OCUPADO" : "DISPONIBLE"}
                      </span>
                      {slot.status === "booked" && (
                        <p className="text-xs text-slate-600 mt-1 font-bold">
                          {slot.by}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminView = ({ onBack, notify, notifications, markAsRead }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const SidebarItem = ({ icon: Icon, label, tabId }) => (
    <div
      onClick={() => setActiveTab(tabId)}
      className={`p-3 flex items-center gap-3 cursor-pointer transition-all font-medium rounded-lg mb-1 ${
        activeTab === tabId
          ? "bg-orange-50 text-orange-700 border-l-4 border-orange-600"
          : "hover:bg-slate-50 hover:text-slate-900 text-slate-500 border-l-4 border-transparent"
      }`}
    >
      <Icon size={20} /> <span>{label}</span>
    </div>
  );
  return (
    <div className="h-full bg-slate-50 flex flex-col md:flex-row font-sans relative">
      {/* OVERLAY PARA ADMIN GLOBAL */}
      <EmergencyOverlay
        notifications={notifications}
        setActiveScreen={(target) => {
          // Si el overlay pide "ver detalles", podemos ir al dashboard
          if (target === "notifications") setActiveTab("dashboard");
        }}
      />

      <div className="w-full md:w-64 bg-white border-r border-slate-200 text-slate-600 flex flex-col z-20">
        <div className="p-6 border-b border-slate-100">
          <BrandLogo />
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4">
            Gestión Global
          </p>
          <SidebarItem icon={BarChart3} label="Dashboard" tabId="dashboard" />
          <SidebarItem icon={Users} label="Residentes" tabId="residents" />
          <SidebarItem icon={MapPin} label="Rondas & SLA" tabId="rounds" />
          <SidebarItem icon={FileText} label="Reportes" tabId="reports" />
          <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">
            Hardware
          </p>
          <SidebarItem icon={Video} label="Cámaras LPR" tabId="lpr_config" />
        </nav>
        <div className="p-4 border-t border-slate-100">
          <Button
            variant="secondary"
            className="w-full"
            onClick={onBack}
            size="sm"
          >
            <LogOut size={14} /> Cerrar Sesión
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <header className="bg-white px-8 py-5 flex justify-between items-center border-b border-slate-200 shadow-sm sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              {activeTab === "dashboard"
                ? "Panel de Control General"
                : activeTab === "reports"
                ? "Reportes Globales"
                : activeTab}
            </h2>
            <p className="text-sm text-slate-500 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
              Estado del Sistema: Óptimo
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-full border border-slate-200 relative shadow-sm">
              <Bell className="text-slate-500" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </div>
          </div>
        </header>
        <div className="p-8">
          {activeTab === "reports" && <ReportsModule notify={notify} />}
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-5 border-l-4 border-l-orange-500">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-slate-500 text-xs font-bold uppercase">
                      Visitas Activas
                    </p>
                    <Users size={18} className="text-orange-500" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">142</h3>
                  <p className="text-xs text-emerald-600 mt-1 flex items-center font-bold">
                    ▲ 12% vs ayer
                  </p>
                </Card>
                <Card className="p-5 border-l-4 border-l-slate-600">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-slate-500 text-xs font-bold uppercase">
                      Cumplimiento
                    </p>
                    <Activity size={18} className="text-slate-600" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">98.5%</h3>
                  <p className="text-xs text-emerald-600 mt-1 font-bold">
                    SLA Rondas
                  </p>
                </Card>
                <Card className="p-5 border-l-4 border-l-red-500">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-slate-500 text-xs font-bold uppercase">
                      Alertas
                    </p>
                    <AlertTriangle size={18} className="text-red-500" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">3</h3>
                  <p className="text-xs text-red-600 mt-1 font-bold">
                    Pendientes de revisión
                  </p>
                </Card>
                <Card className="p-5 border-l-4 border-l-blue-500">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-slate-500 text-xs font-bold uppercase">
                      Reservas SUM
                    </p>
                    <Calendar size={18} className="text-blue-500" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">8</h3>
                  <p className="text-xs text-slate-400 mt-1 font-bold">
                    Para hoy
                  </p>
                </Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-0">
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                    <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">
                      Últimos Ingresos Globales
                    </h3>
                    <span className="text-xs text-orange-600 font-bold cursor-pointer hover:underline">
                      VER REPORTE
                    </span>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
                      <tr>
                        <th className="px-6 py-3">Hora</th>
                        <th className="px-6 py-3">Tipo</th>
                        <th className="px-6 py-3">Detalle</th>
                        <th className="px-6 py-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">
                          14:32:01
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                            Visita
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-700">
                          Juan Pérez{" "}
                          <span className="text-slate-400 font-normal">
                            → UF 402
                          </span>
                        </td>
                        <td className="px-6 py-4 text-emerald-600 font-bold text-xs">
                          AUTORIZADO
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                <Card className="p-0 flex flex-col">
                  <div className="px-6 py-4 border-b border-slate-100 bg-white">
                    <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">
                      Mapa de Calor
                    </h3>
                  </div>
                  <div className="flex-1 bg-slate-50 p-6 flex flex-col items-center justify-center min-h-[200px] relative">
                    <MapPin size={48} className="text-slate-300 mb-2" />
                    <p className="text-slate-400 text-xs text-center font-medium">
                      Visualización Georreferenciada
                      <br />
                      (Datos en tiempo real)
                    </p>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentRole, setCurrentRole] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const normalizeTask = (t) => ({
    id: t.id ?? Date.now(),
    title: t.title ?? t.name ?? "Sin título",
    description: t.description ?? t.desc ?? "",
    priority: t.priority ?? t.level ?? "normal",
    status: t.status ?? "pending",
    author: t.author ?? "Sistema",
    date: t.date ?? "—",
  });

  const [guardTasks, setGuardTasks] = useState(() =>
    TASKS_DB.map(normalizeTask)
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notification, setNotification] = useState(null);
  const [globalNotifications, setGlobalNotifications] = useState(
    INITIAL_NOTIFICATIONS
  );
  const [showShiftReport, setShowShiftReport] = useState(false);
  const [shiftLogs, setShiftLogs] = useState([]);

  const addLog = (type, detail) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setShiftLogs((prev) => [{ time, type, detail }, ...prev]);
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };
  const resetAuth = () => {
    setIsAuthenticated(false);
    setCurrentRole(null);
    setCurrentUser("");
    setNotification(null);
  };

  // --- FUNCIÓN CENTRALIZADA PARA AGREGAR NOTIFICACIONES ---
  // ✅ OK: agrega notificación
  const addGlobalNotification = (newNotif) => {
    const notifObject = {
      id: Date.now(),
      date: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
      ...newNotif, // <-- era .newNotif
    };
    setGlobalNotifications((prev) => [notifObject, ...prev]); // <-- era .prev
  };

  // ✅ OK: marcar como leída
  const markAsRead = (id) => {
    setGlobalNotifications(
      (prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)) // <-- era .n
    );
  };

  const LiveActivityDrawer = ({
    logs = [],
    onClear,
    title = "REGISTRO DE ACTIVIDAD EN VIVO",
  }) => {
    const [open, setOpen] = useState(false);

    // Solo los últimos N para no hacer infinito el DOM
    const visible = logs.slice(0, 40);

    return (
      <div className="fixed bottom-0 left-0 right-0 z-[150] pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 pb-4 pointer-events-auto">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header (siempre visible) */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="w-full px-4 py-3 bg-orange-50 border-b border-orange-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-orange-600" />
                <span className="text-xs font-black text-orange-600 uppercase tracking-widest">
                  {title}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-1 rounded-full">
                  ● ONLINE
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  ({logs.length})
                </span>
              </div>

              <div className="flex items-center gap-2">
                {typeof onClear === "function" && (
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClear();
                    }}
                    className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded bg-white border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200"
                    role="button"
                  >
                    <Trash2 size={14} /> Limpiar
                  </span>
                )}

                {open ? (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-slate-500" />
                )}
              </div>
            </button>

            {/* Body (colapsable) */}
            <div
              className={`transition-all duration-300 ease-out ${
                open ? "max-h-[45vh]" : "max-h-0"
              } overflow-hidden`}
            >
              <div className="p-4 bg-white">
                {visible.length === 0 ? (
                  <div className="text-slate-400 text-sm font-bold text-center py-6">
                    Sin eventos aún.
                  </div>
                ) : (
                  <div className="space-y-2 font-mono text-xs">
                    {visible.map((log, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 p-2 rounded hover:bg-slate-50 border-l-4"
                        style={{
                          borderLeftColor:
                            log.type === "ALERTA"
                              ? "rgb(220 38 38)"
                              : log.type === "LPR"
                              ? "rgb(37 99 235)"
                              : log.type === "PAQUETERÍA"
                              ? "rgb(249 115 22)"
                              : "rgb(16 185 129)",
                        }}
                      >
                        <span className="text-slate-400 font-bold min-w-[54px]">
                          [{log.time ?? "--:--"}]
                        </span>
                        <span className="text-[10px] font-black uppercase text-slate-500 min-w-[90px]">
                          {log.type ?? "EVENTO"}
                        </span>
                        <span className="text-slate-700 flex-1">
                          {log.detail ?? ""}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="pt-3 text-[10px] text-slate-400 font-mono">
                  Mostrando últimos {visible.length} eventos.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (currentRole && !isAuthenticated)
      return (
        <LoginScreen
          role={currentRole}
          onLoginSuccess={(name) => {
            setIsAuthenticated(true);
            setCurrentUser(name);
          }}
          onBack={() => setCurrentRole(null)}
        />
      );
    if (currentRole && isAuthenticated) {
      return (
        <div className="h-screen w-full bg-white overflow-hidden font-sans">
          {currentRole === "guard" && (
            <GuardView
              onBack={resetAuth}
              currentUser={currentUser}
              notify={showNotification}
              addGlobalNotification={addGlobalNotification}
              notifications={globalNotifications}
              markAsRead={markAsRead}
              addLog={addLog}
              guardTasks={guardTasks}
              setGuardTasks={setGuardTasks}
              shiftLogs={shiftLogs}
              openShiftReport={() => setShowShiftReport(true)}
            />
          )}

          {currentRole === "resident" && (
            <ResidentView
              onBack={resetAuth}
              notify={showNotification}
              notifications={globalNotifications}
              markAsRead={markAsRead}
              addGlobalNotification={addGlobalNotification}
            />
          )}

          {currentRole === "localAdmin" && (
            <LocalAdminView
              onBack={resetAuth}
              currentUser={currentUser}
              notify={showNotification}
              addGlobalNotification={addGlobalNotification}
              notifications={globalNotifications}
              markAsRead={markAsRead}
            />
          )}

          {currentRole === "admin" && (
            <AdminView
              onBack={resetAuth}
              notify={showNotification}
              notifications={globalNotifications}
              markAsRead={markAsRead}
            />
          )}
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="absolute top-0 w-full h-2 bg-orange-600 z-10"></div>
        <div className="max-w-4xl w-full text-center space-y-10 relative z-10">
          <div className="space-y-4 flex flex-col items-center animate-fade-in-up">
            <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 mb-2">
              <Shield
                className="w-20 h-20 text-orange-600 fill-orange-600"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter mb-2">
                BLINDAJE<span className="text-orange-600">DIGITAL</span>
              </h1>
              <p className="text-slate-500 text-lg tracking-wide uppercase font-bold">
                Plataforma Integral de Seguridad
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => setCurrentRole("guard")}
              className="group bg-white hover:bg-orange-50 border-2 border-slate-100 hover:border-orange-500 p-6 rounded-2xl transition-all text-left relative overflow-hidden shadow-lg hover:shadow-2xl h-full flex flex-col justify-between"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 text-orange-600 font-bold group-hover:scale-110 transition-transform">
                <User size={24} />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-black text-slate-800 mb-2 uppercase leading-none">
                  Guardia Operativo
                </h3>
                <p className="text-slate-500 text-xs font-medium">
                  Control de accesos y rondas.
                </p>
              </div>
            </button>
            <button
              onClick={() => setCurrentRole("resident")}
              className="group bg-white hover:bg-orange-50 border-2 border-slate-100 hover:border-orange-500 p-6 rounded-2xl transition-all text-left relative overflow-hidden shadow-lg hover:shadow-2xl h-full flex flex-col justify-between"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 text-slate-600 font-bold group-hover:scale-110 transition-transform">
                <User size={24} />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-black text-slate-800 mb-2 uppercase leading-none">
                  App Residente
                </h3>
                <p className="text-slate-500 text-xs font-medium">
                  Visitas, QR y amenities.
                </p>
              </div>
            </button>
            <button
              onClick={() => setCurrentRole("localAdmin")}
              className="group bg-white hover:bg-orange-50 border-2 border-slate-100 hover:border-orange-500 p-6 rounded-2xl transition-all text-left relative overflow-hidden shadow-lg hover:shadow-2xl h-full flex flex-col justify-between"
            >
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 text-white font-bold group-hover:scale-110 transition-transform">
                <Building size={24} />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-black text-slate-800 mb-2 uppercase leading-none">
                  Admin Local
                </h3>
                <p className="text-slate-500 text-xs font-medium">
                  Gestión del Barrio.
                </p>
              </div>
            </button>
            <button
              onClick={() => setCurrentRole("admin")}
              className="group bg-white hover:bg-orange-50 border-2 border-slate-100 hover:border-orange-500 p-6 rounded-2xl transition-all text-left relative overflow-hidden shadow-lg hover:shadow-2xl h-full flex flex-col justify-between"
            >
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 text-white font-bold group-hover:scale-110 transition-transform">
                <BarChart3 size={24} />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-black text-slate-800 mb-2 uppercase leading-none">
                  Super Admin
                </h3>
                <p className="text-slate-500 text-xs font-medium">
                  Auditoría global.
                </p>
              </div>
            </button>
          </div>
          <p className="text-slate-400 text-xs font-medium">
            © 2026 Blindaje S.A. • Mendoza, Argentina
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <GlobalStyles />
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {renderContent()}

      {showShiftReport && (
        <ShiftReportModal
          onClose={() => setShowShiftReport(false)}
          onConfirm={(report) => {
            // 1) Guardar reporte (mock / futuro backend)
            setShiftLogs((prev) => [...prev, report]);

            // 1) (futuro backend / storage externo)
            // saveShiftReport(report)

            // 2) Cerrar modal
            setShowShiftReport(false);

            // 3) Feedback
            showNotification("Cierre de turno registrado", "success");

            // 4) Limpieza de turno
            setShiftLogs([]);
            setGuardTasks(TASKS_DB); // o []

            // 5) Cierre de sesión
            resetAuth();
          }}
          guardName={currentUser}
          logs={shiftLogs}
          tasks={guardTasks}
          addGlobalNotification={addGlobalNotification}
        />
      )}
      {isAuthenticated && currentRole === "guard" && (
        <LiveActivityDrawer logs={shiftLogs} onClear={() => setShiftLogs([])} />
      )}
    </div>
  );
}
