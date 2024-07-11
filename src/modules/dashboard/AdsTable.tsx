import useAds from './hooks/useAdds';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function AdsTable() {
  const { ads, loading, error } = useAds();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading chart data: {error.message}</div>;
  }

  return (
    <Table>
      <TableCaption>A list of Ads.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Ad</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Impressions</TableHead>
          <TableHead className="text-right">Clicks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(ads) &&
          ads.map((ad) => (
            <TableRow key={ad.id}>
              <TableCell className="font-medium">{ad.id}</TableCell>
              <TableCell>{ad.title}</TableCell>
              <TableCell>{ad.description}</TableCell>
              <TableCell>{ad.impressions}</TableCell>
              <TableCell>{ad.clicks}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
