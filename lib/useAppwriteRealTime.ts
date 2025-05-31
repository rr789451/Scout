import { useEffect, useState } from "react";
import { useAppwrite } from "./useAppwrite";
import { client, config } from "./appwrite";

const useAppwriteRealTime = <T, P extends Record<string, string | number>>({
  fn,
  params,
  collection,
  realTime = false
}: {
  fn: (params: P) => Promise<T>;
  params: P;
  collection: string;
  realTime?: boolean;
}) => {
  // Initial data fetch using existing hook
  const { data, loading, error, refetch } = useAppwrite({
    fn,
    params
  });

  const [realtimeData, setRealtimeData] = useState<T | null>(null);

  useEffect(() => {
    if (!realTime || !params.id) return;

    // Subscribe to real-time updates
    const documentPath = `databases.${config.databaseId}.collections.${config.propertiesCollectionId}.documents.${params.id}`;
    const unsubscribe = client.subscribe(
      documentPath,
      response => {
        if (response.events.includes('databases.*.collections.*.documents.*.update')) {
          setRealtimeData(response.payload as T);
        }
      }
    );

    return () => unsubscribe();
  }, [realTime, params.id, collection]);

  return {
    data: realtimeData ?? data,
    loading,
    error,
    refetch
  };
};

export { useAppwriteRealTime }