export const VaultListItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between py-4 rounded-xl px-4">
      <div className="flex items-center gap-4">
        {/* Vault 아이콘 Skeleton */}
        <div className="w-14 h-14 bg-gray-800 rounded-full animate-pulse" />
        <div>
          {/* 제목 Skeleton */}
          <div className="h-7 w-40 bg-gray-800 rounded animate-pulse mb-2" />
          {/* 가격 Skeleton */}
          <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      {/* APY Skeleton */}
      <div className="h-8 w-24 bg-gray-800 rounded animate-pulse" />
    </div>
  );
};
