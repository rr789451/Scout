import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetchUser: (newParams?: Record<string, string | number>) => Promise<void>;
    updateUserBookmarks: (propertyId: string, isAdding: boolean) => void;
}

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
    rentedProperties: string[];
    bookmarkedProperties: string[];
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    
    const {
        data: userData,
        loading,
        refetch,
    } = useAppwrite({
        fn: getCurrentUser,
    });

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (userData) {
            setUser({
                $id: userData.$id,
                name: userData.name,
                email: userData.email,
                avatar: (userData as any).avatar ?? "", // Provide a fallback if needed
                rentedProperties: Array.isArray((userData as any).rentedProperties) ? (userData as any).rentedProperties : [],
                bookmarkedProperties: Array.isArray((userData as any).bookmarkedProperties) ? (userData as any).bookmarkedProperties : [],
            });
        }
    }, [userData]);

    const updateUserBookmarks = (propertyId: string, isAdding: boolean) => {
        if (!user) return;
        
        const currentBookmarks = user.bookmarkedProperties || [];
        const updatedBookmarks = isAdding 
            ? [...currentBookmarks, propertyId]
            : currentBookmarks.filter(id => id !== propertyId);
        
        setUser({ 
            ...user, 
            bookmarkedProperties: updatedBookmarks 
        });
    };

    const isLoggedIn = !!user;

    return (
        <GlobalContext.Provider value={{ 
            isLoggedIn, 
            user, 
            loading, 
            refetchUser: refetch,
            updateUserBookmarks,
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);

    if(!context){
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;

}

export default GlobalProvider;