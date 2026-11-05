import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { getProfile } from '../api';
import { defaultProfile, type VoyantProfile } from '../platform-types';

const ProfileContext = createContext<{
  profile: VoyantProfile;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
  setProfile: (profile: VoyantProfile) => void;
}>({ profile: defaultProfile, loading: true, error: '', refresh: () => Promise.resolve(), setProfile: () => {} });
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    try { setProfile(await getProfile()); setError(''); }
    catch { setError('Impossible de charger les coordonnées. Veuillez réessayer.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  return <ProfileContext.Provider value={{ profile, loading, error, refresh, setProfile }}>{children}</ProfileContext.Provider>;
}
export const useProfile = () => useContext(ProfileContext);
