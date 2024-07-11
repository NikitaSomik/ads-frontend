import { useEffect, useState } from 'react';
import api from '@/axiosConfig';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function AdsTable() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        api.get('/ads')
            .then(response => {
                setAds(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching ads:', error);
            });
    }, []);

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
            {Array.isArray(ads) && ads.map(ad => (
                    <TableRow key={ad.id}>
                        <TableCell className="font-medium">{ad.id}</TableCell>
                        <TableCell>{ad.title}</TableCell>
                        <TableCell>{ad.description}</TableCell>
                        <TableCell>{ad.impressions}</TableCell>
                        <TableCell>{ad.clicks}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                {/* <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow> */}
            </TableFooter>
        </Table>
    )
}

