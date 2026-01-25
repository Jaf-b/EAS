import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { GeminiService } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/types";

export default function Login() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<UserRole>('pdg');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);

    try {
        if (!isRegistering) {
            // Login
            const success = await login(username);
            if (success) {
                toast({ title: "Bon retour !", description: `Connecté en tant que ${username}` });
            } else {
                 toast({ 
                    variant: "destructive", 
                    title: "Utilisateur introuvable", 
                    description: "Ce nom d'utilisateur n'existe pas. Veuillez vous inscrire." 
                });
                setIsRegistering(true); // Switch to register mode
            }
            return;
        }

        // Registration with Gemini Check
        const moderation = await GeminiService.checkContent(username, 'username');
        if (!moderation.allowed) {
            toast({ 
                variant: "destructive",
                title: "Nom d'utilisateur rejeté", 
                description: moderation.reason || "Ce nom d'utilisateur n'est pas autorisé." 
            });
            setIsLoading(false);
            return;
        }

        const regSuccess = await register(username, role);
        if (regSuccess) {
            toast({ title: "Compte créé", description: "Bienvenue sur EAS." });
        } else {
            toast({ variant: "destructive", title: "Erreur", description: "Nom d'utilisateur déjà pris." });
        }

    } catch (error) {
        console.error(error);
        toast({ variant: "destructive", title: "Erreur", description: "Une erreur est survenue." });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 relative overflow-hidden">
        {/* Background elements for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 rounded-full blur-[100px]" />

        <Card className="w-full max-w-md z-10 glass-card animate-fade-in border-white/40">
            <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
                <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <span className="font-logo font-bold text-white text-xl">EAS</span>
                </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
                {isRegistering ? "Créer un compte" : "Bon retour"}
            </CardTitle>
            <CardDescription className="text-center">
                {isRegistering 
                    ? "Entrez un nom d'utilisateur unique pour commencer" 
                    : "Entrez vos identifiants pour accéder au tableau de bord"
                }
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="username">Nom d'utilisateur</Label>
                    <Input 
                        id="username" 
                        placeholder="jdoe" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="bg-white/50 backdrop-blur-sm"
                    />
                </div>
                
                {isRegistering && (
                    <div className="space-y-2 animate-fade-in">
                        <Label htmlFor="role">Rôle</Label>
                        <select
                            id="role"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-white/50 backdrop-blur-sm"
                            value={role}
                            onChange={(e) => setRole(e.target.value as UserRole)}
                        >
                            <option value="pdg">PDG</option>
                            <option value="engineer">Ingénieur Logiciel</option>
                            <option value="employee">Employé</option>
                        </select>
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••" 
                        className="bg-white/50 backdrop-blur-sm"
                        required
                    />
                    <p className="text-[10px] text-muted-foreground">
                        (Utilisé uniquement pour l'identification interne)
                    </p>
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isRegistering ? "Vérification..." : "Connexion..."}
                        </>
                    ) : (
                        isRegistering ? "S'inscrire" : "Se connecter"
                    )}
                </Button>
            </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button variant="link" size="sm" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
