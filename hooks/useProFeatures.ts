'use client';

import { useState, useEffect } from 'react';

const PRO_FEATURES_KEY = 'yourpin_pro_features';
const PRO_EXPIRY_HOURS = 24;

interface ProFeatureState {
    unlocked: boolean;
    expiresAt: number | null;
}

export function useProFeatures() {
    const [proFeatures, setProFeatures] = useState<Record<string, ProFeatureState>>({});

    // Load pro features from sessionStorage on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const stored = sessionStorage.getItem(PRO_FEATURES_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                const now = Date.now();

                // Filter out expired features
                const validFeatures: Record<string, ProFeatureState> = {};
                Object.entries(parsed).forEach(([key, value]: [string, any]) => {
                    if (value.expiresAt && value.expiresAt > now) {
                        validFeatures[key] = value;
                    }
                });

                setProFeatures(validFeatures);
                sessionStorage.setItem(PRO_FEATURES_KEY, JSON.stringify(validFeatures));
            } catch (error) {
                console.error('Error loading pro features:', error);
            }
        }
    }, []);

    const isFeatureUnlocked = (featureName: string): boolean => {
        const feature = proFeatures[featureName];
        if (!feature) return false;

        const now = Date.now();
        if (feature.expiresAt && feature.expiresAt < now) {
            // Feature expired, remove it
            const updated = { ...proFeatures };
            delete updated[featureName];
            setProFeatures(updated);
            sessionStorage.setItem(PRO_FEATURES_KEY, JSON.stringify(updated));
            return false;
        }

        return feature.unlocked;
    };

    const unlockFeature = (featureName: string) => {
        const expiresAt = Date.now() + (PRO_EXPIRY_HOURS * 60 * 60 * 1000);
        const updated = {
            ...proFeatures,
            [featureName]: {
                unlocked: true,
                expiresAt,
            },
        };

        setProFeatures(updated);
        sessionStorage.setItem(PRO_FEATURES_KEY, JSON.stringify(updated));
    };

    const getTimeRemaining = (featureName: string): number => {
        const feature = proFeatures[featureName];
        if (!feature || !feature.expiresAt) return 0;

        const remaining = feature.expiresAt - Date.now();
        return Math.max(0, Math.floor(remaining / 1000 / 60)); // Return minutes
    };

    return {
        isFeatureUnlocked,
        unlockFeature,
        getTimeRemaining,
    };
}
