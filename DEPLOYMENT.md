# Déploiement sur Vercel - EAS Application

## Méthode 1 : Déploiement via Interface Web Vercel (Recommandé)

### Étapes :

1. **Créer un compte Vercel** (si vous n'en avez pas)
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec GitHub, GitLab, ou Bitbucket

2. **Préparer votre code**
   - Assurez-vous que votre code est dans un dépôt Git (GitHub, GitLab, ou Bitbucket)
   - Si ce n'est pas encore fait, initialisez Git :
     ```bash
     cd c:\Users\JAFRED\Desktop\EAS
     git init
     git add .
     git commit -m "Initial commit - EAS Application"
     ```
   - Créez un dépôt sur GitHub et poussez votre code :
     ```bash
     git remote add origin https://github.com/VOTRE_USERNAME/eas.git
     git branch -M main
     git push -u origin main
     ```

3. **Importer le projet sur Vercel**
   - Sur le dashboard Vercel, cliquez sur "Add New Project"
   - Sélectionnez votre dépôt Git (GitHub/GitLab/Bitbucket)
   - Vercel détectera automatiquement Vite
   - Les paramètres par défaut devraient être :
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

4. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez quelques minutes
   - Votre application sera disponible sur une URL comme : `https://eas-xxxxx.vercel.app`

## Méthode 2 : Déploiement via CLI Vercel

### Installation de Vercel CLI :

```bash
npm install -g vercel
```

### Déploiement :

```bash
cd c:\Users\JAFRED\Desktop\EAS
vercel
```

Suivez les instructions interactives :

- Login avec votre compte Vercel
- Confirmez les paramètres du projet
- Le déploiement se lancera automatiquement

### Déploiement en Production :

```bash
vercel --prod
```

## Configuration Importante

### Variables d'Environnement (Optionnel)

Si vous utilisez l'API Gemini en production, ajoutez votre clé API :

1. Dans le dashboard Vercel, allez dans "Settings" > "Environment Variables"
2. Ajoutez : `VITE_GEMINI_API_KEY` = votre clé API

### Domaine Personnalisé (Optionnel)

1. Dans Vercel Dashboard > Settings > Domains
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions DNS

## Vérification Post-Déploiement

Après le déploiement, testez :

- ✅ Page de connexion
- ✅ Dashboard PDG/Ingénieur
- ✅ Gestion des projets
- ✅ Kanban avec Drag & Drop
- ✅ Timeline
- ✅ Modification des tâches

## Déploiements Automatiques

Une fois connecté à Git, Vercel déploiera automatiquement :

- **Production** : À chaque push sur la branche `main`
- **Preview** : À chaque pull request

## Commandes Utiles

```bash
# Voir les déploiements
vercel ls

# Voir les logs
vercel logs

# Ouvrir le projet dans le navigateur
vercel open

# Supprimer un déploiement
vercel rm [deployment-url]
```

## Support

- Documentation Vercel : https://vercel.com/docs
- Support : https://vercel.com/support
