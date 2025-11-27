import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './contexts/ThemeContext';
import { Home } from './pages/Home';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { CreateRecipe } from './pages/CreateRecipe';
import { EditRecipe } from './pages/EditRecipe';
import { MealPlan } from './pages/MealPlan';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
          <Route path="/meal-plan" element={<MealPlan />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
