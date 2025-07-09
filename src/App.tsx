@@ .. @@
   const [currentUser, setCurrentUser] = useState<User | null>(null);
-  const [selectedObra, setSelectedObra] = useState<string>('los-encinos-id'); // ID fijo para Los Encinos
+  const selectedObra = 'los-encinos-id'; // ID fijo para Los Encinos
   const [activeModule, setActiveModule] = useState<string>('dashboard');