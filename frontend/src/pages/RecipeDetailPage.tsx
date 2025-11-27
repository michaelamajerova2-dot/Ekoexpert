import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, MoreVertical, Share2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { MainLayout } from '../components/Layout/MainLayout';
import { ConfirmDialog } from '../components/Common/ConfirmDialog';
import { useRecipe } from '../hooks/useRecipes';
import { recipeApi } from '../services/api';
import { CATEGORY_LABELS } from '../types/recipe.types';

// Helper to convert markdown to HTML
const parseMarkdown = (text: string): string => {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // **bold**
    .replace(/\*(.+?)\*/g, '<em>$1</em>'); // *italic*
};

export const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipe, loading, error } = useRecipe(id!);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareSubmenu, setShowShareSubmenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    if (!id) return;

    try {
      setIsDeleting(true);
      await recipeApi.delete(id);
      toast.success('Recept bol úspešne vymazaný!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      toast.error('Nepodarilo sa vymazať recept. Skús to znova.');
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleShare = async () => {
    setShowMenu(false);

    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success('Link bol skopírovaný do schránky!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Nepodarilo sa skopírovať link. Skús to znova.');
    }
  };

  const handleExportImage = async () => {
    setShowMenu(false);

    if (!exportRef.current) return;

    try {
      toast.info('Vytváram obrázok...');

      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${recipe?.title || 'recept'}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toast.success('Obrázok bol stiahnutý!');
        }
      });
    } catch (error) {
      console.error('Error exporting image:', error);
      toast.error('Nepodarilo sa vytvoriť obrázok. Skús to znova.');
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setShowShareSubmenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  // Close share submenu when main menu closes
  useEffect(() => {
    if (!showMenu) {
      setShowShareSubmenu(false);
    }
  }, [showMenu]);

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8" />
            <div className="h-96 bg-gray-200 rounded-xl mb-6" />
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !recipe) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error || 'Recept nebol nájdený'}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button and Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Späť
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Možnosti"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 animate-fadeIn">
                <Link
                  to={`/edit/${id}`}
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowMenu(false)}
                >
                  <Edit className="w-4 h-4" />
                  <span>Upraviť</span>
                </Link>

                {/* Zdieľať submenu */}
                <div className="relative">
                  <button
                    onClick={() => setShowShareSubmenu(!showShareSubmenu)}
                    className="flex items-center justify-between gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Share2 className="w-4 h-4" />
                      <span>Zdieľať</span>
                    </div>
                    <span className="text-xs">{showShareSubmenu ? '▼' : '▶'}</span>
                  </button>

                  {showShareSubmenu && (
                    <div className="pl-8 bg-gray-50">
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors w-full text-left text-sm"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>Skopírovať link</span>
                      </button>
                      <button
                        onClick={handleExportImage}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors w-full text-left text-sm"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Exportovať obrázok</span>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowDeleteDialog(true);
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-red-700 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Vymazať</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hero Image */}
        {recipe.image && (
          <div className="w-full h-96 rounded-xl overflow-hidden mb-6">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title & Meta */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {/* Display categories - support both single (legacy) and array */}
            {recipe.category && (
              Array.isArray(recipe.category) ? (
                recipe.category.map((cat) => (
                  <span key={cat} className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] || cat}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                  {CATEGORY_LABELS[recipe.category as keyof typeof CATEGORY_LABELS] || recipe.category}
                </span>
              )
            )}
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>

          {recipe.description && (
            <p className="text-lg text-gray-600 mb-4">{recipe.description}</p>
          )}
        </div>

        <hr className="my-8" />

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingrediencie</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-2">
                {/* Support both string and legacy array format */}
                {typeof recipe.ingredients === 'string'
                  ? recipe.ingredients.split('\n').filter(line => line.trim()).map((ingredient, i) => (
                      <li
                        key={i}
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(ingredient) }}
                      />
                    ))
                  : recipe.ingredients.map((ingredient) => (
                      <li key={ingredient.id} className="text-gray-700">
                        • {ingredient.amount && ingredient.unit ? `${ingredient.amount} ${ingredient.unit} ` : ''}
                        {ingredient.name}
                        {ingredient.note ? ` (${ingredient.note})` : ''}
                      </li>
                    ))
                }
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Postup</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="prose prose-gray max-w-none">
                {recipe.instructions.split('\n').map((line, i) => (
                  <p key={i} className="text-gray-700 mb-3">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden div for export - positioned off-screen */}
      <div
        ref={exportRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '800px',
          backgroundColor: '#ffffff',
          padding: '40px',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        {/* Export Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '30px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#111827',
              margin: '0 0 10px 0'
            }}>
              {recipe.title}
            </h1>
            {recipe.description && (
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: 0
              }}>
                {recipe.description}
              </p>
            )}
            {recipe.category && (
              <div style={{ marginTop: '15px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Array.isArray(recipe.category) ? (
                  recipe.category.map((cat) => (
                    <span key={cat} style={{
                      display: 'inline-block',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] || cat}
                    </span>
                  ))
                ) : (
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {CATEGORY_LABELS[recipe.category as keyof typeof CATEGORY_LABELS] || recipe.category}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Recipe Image */}
          {recipe.image && (
            <div style={{
              padding: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f9fafb',
              minHeight: '300px',
              maxHeight: '500px',
              overflow: 'hidden'
            }}>
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  display: 'block'
                }}
                crossOrigin="anonymous"
              />
            </div>
          )}

          {/* Content */}
          <div style={{ padding: '30px' }}>
            {/* Ingredients */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '15px'
              }}>
                Ingrediencie
              </h2>
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '20px',
                borderRadius: '8px'
              }}>
                {typeof recipe.ingredients === 'string' ? (
                  recipe.ingredients.split('\n').filter(line => line.trim()).map((ingredient, i) => (
                    <div
                      key={i}
                      style={{
                        color: '#374151',
                        marginBottom: '8px',
                        fontSize: '15px',
                        lineHeight: '1.5'
                      }}
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(ingredient) }}
                    />
                  ))
                ) : (
                  recipe.ingredients.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      style={{
                        color: '#374151',
                        marginBottom: '8px',
                        fontSize: '15px'
                      }}
                    >
                      • {ingredient.amount && ingredient.unit ? `${ingredient.amount} ${ingredient.unit} ` : ''}
                      {ingredient.name}
                      {ingredient.note ? ` (${ingredient.note})` : ''}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '15px'
              }}>
                Postup
              </h2>
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '20px',
                borderRadius: '8px'
              }}>
                {recipe.instructions.split('\n').map((line, i) => (
                  <p
                    key={i}
                    style={{
                      color: '#374151',
                      marginBottom: '12px',
                      fontSize: '15px',
                      lineHeight: '1.6'
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '20px 30px',
            borderTop: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0,
              fontWeight: '500'
            }}>
              Šmakociny - {recipe.title}
            </p>
          </div>
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Vymazať recept"
        message={`Naozaj chceš vymazať recept "${recipe.title}"? Táto akcia sa nedá vrátiť späť.`}
        confirmText={isDeleting ? 'Mažem...' : 'Vymazať'}
        cancelText="Zrušiť"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        variant="danger"
      />
    </MainLayout>
  );
};
