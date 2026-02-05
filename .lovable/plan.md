

## 🗺️ Citymapper Horizon - Extension Multi-Villes

### Vue d'ensemble
Application de découverte urbaine permettant de trouver des pépites locales entre deux adresses, avec support pour Paris et Athènes.

---

### 🎨 Design & Navigation (conservés)
- Hero section avec le slogan "Redéfinir la Mobilité Urbaine"
- Palette de couleurs teal (#02C39A) et bleu (#1C7293)
- Navigation sticky avec les liens existants
- Footer avec téléchargement App Store/Google Play
- Social Flocks et contrôles de carte

---

### 🆕 Nouvelles fonctionnalités

#### 1. Champs de recherche "Départ" et "Destination"
- **Deux champs style Google Maps** positionnés en haut de la sidebar
- **Icônes distinctives** : cercle vert pour Départ, marqueur rouge pour Destination
- **Autocomplétion d'adresses** utilisant l'API OpenStreetMap Nominatim (gratuite)
- **Bouton "Rechercher l'itinéraire"** pour lancer la recherche

#### 2. Sélecteur de ville
- **Dropdown permettant de basculer entre Paris et Athènes**
- Changement automatique du fond de carte vers la ville sélectionnée

#### 3. Itinéraire Paris (existant - conservé)
Les 6 pépites existantes :
- Café Kitsuné
- Galerie Vivienne
- L'Échappée Belle
- Chez Janou
- Musée Carnavalet
- L'As du Fallafel

#### 4. Itinéraire Athènes (nouveau)
Pépites locales pré-définies pour Athènes incluant :
- **Cafés** : Little Kook, Taf Coffee, Yiasemi
- **Culture** : Musée de l'Acropole, Anafiotika, Plaka
- **Gastronomie** : Thanasis, Kuzina, Kalamaki Bar

#### 5. Affichage des pépites sur le trajet
- Lors de la recherche, affichage des pépites **proches du trajet** entre les deux adresses
- Tracé de l'itinéraire en pointillés sur la carte
- Cards de découverte avec les mêmes informations (distance, note, catégorie, prix)

---

### 🔧 Fonctionnement technique simplifié
- **Autocomplétion** : API Nominatim (OpenStreetMap) gratuite
- **Données** : Listes statiques de pépites pour Paris et Athènes
- **Carte** : Leaflet avec tiles OpenStreetMap (comme l'original)
- **Pas de backend requis** : Tout fonctionne côté client

