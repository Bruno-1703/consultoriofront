import { Skeleton } from "@mui/material";

export default function LoadingSkeleton() {
  return (
    <div>
      {/* Header Skeleton */}
      <Skeleton variant="rectangular" height={60} animation="wave" />
      
      {/* Main Content Skeleton */}
      <div style={{ padding: 16 }}>
        <Skeleton variant="rectangular" height={600} animation="wave" />
      </div>
    </div>
  );
}