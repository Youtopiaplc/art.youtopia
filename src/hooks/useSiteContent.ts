import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { artworks as defaultArtworks, defaultArtist, type Artwork, type ArtistProfile } from "@/data/artworks";

export function useSiteContent() {
  const [artist, setArtist] = useState<ArtistProfile>(defaultArtist);
  const [artworks, setArtworks] = useState<Artwork[]>(defaultArtworks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([loadArtist(), loadArtworks()]);
    setLoading(false);
  };

  const loadArtist = async () => {
    const { data, error } = await supabase
      .from('artist_profile')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (error) {
      console.error('Error loading artist:', error);
      return;
    }
    
    if (data) {
      setArtist(data as ArtistProfile);
    }
  };

  const loadArtworks = async () => {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .order('number', { ascending: true });
    
    if (error) {
      console.error('Error loading artworks:', error);
      return;
    }
    
    if (data && data.length > 0) {
      setArtworks(data as Artwork[]);
    } else {
      await seedArtworks();
    }
  };

  const seedArtworks = async () => {
    for (const art of defaultArtworks) {
      await supabase
        .from('artworks')
        .upsert(art)
        .eq('id', art.id);
    }
    setArtworks(defaultArtworks);
  };

  const uploadImage = async (file: File, fileName: string): Promise<string | null> => {
    const { data, error } = await supabase.storage
      .from('artworks')
      .upload(fileName, file, { upsert: true });
    
    if (error) {
      console.error('Upload error:', error);
      return null;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('artworks')
      .getPublicUrl(fileName);
    
    return publicUrl;
  };

  const replaceArtworks = async (newArtworks: Artwork[]) => {
    for (const art of newArtworks) {
      await supabase
        .from('artworks')
        .upsert(art)
        .eq('id', art.id);
    }
    setArtworks(newArtworks);
  };

  const updateArtwork = async (id: string, updates: Partial<Artwork>) => {
    const { data, error } = await supabase
      .from('artworks')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Update error:', error);
      return;
    }
    
    if (data) {
      setArtworks(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    }
  };

  const addArtwork = async (artwork: Artwork) => {
    const { data, error } = await supabase
      .from('artworks')
      .insert(artwork)
      .select();
    
    if (error) {
      console.error('Add error:', error);
      return;
    }
    
    if (data) {
      setArtworks(prev => [...prev, data[0]]);
    }
  };

  const deleteArtwork = async (id: string) => {
    const { error } = await supabase
      .from('artworks')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Delete error:', error);
      return;
    }
    
    setArtworks(prev => prev.filter(a => a.id !== id));
  };

  const replaceArtist = async (newArtist: ArtistProfile) => {
    const { error } = await supabase
      .from('artist_profile')
      .upsert({ id: 1, ...newArtist })
      .eq('id', 1);
    
    if (error) {
      console.error('Artist update error:', error);
      return;
    }
    
    setArtist(newArtist);
  };

  const verifyPassword = async (password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('password_hash')
        .eq('id', 1)
        .single();
      
      if (error || !data) {
        await supabase
          .from('admin_settings')
          .upsert({ id: 1, password_hash: 'admin123' });
        return password === 'admin123';
      }
      
      return password === data.password_hash;
    } catch (err) {
      console.error('Error verifying password:', err);
      return false;
    }
  };

  const updateAdminPassword = async (newPassword: string) => {
    const { error } = await supabase
      .from('admin_settings')
      .upsert({ id: 1, password_hash: newPassword })
      .eq('id', 1);
    
    if (error) {
      console.error('Password update error:', error);
      return false;
    }
    return true;
  };

  const resetAll = async () => {
    await seedArtworks();
    await replaceArtist(defaultArtist);
    localStorage.removeItem("miki_admin_unlocked");
    await loadAllData();
  };

  return {
    artist,
    artworks,
    loading,
    replaceArtist,
    replaceArtworks,
    updateArtwork,
    addArtwork,
    deleteArtwork,
    uploadImage,
    verifyPassword,
    updateAdminPassword,
    resetAll,
  };
}