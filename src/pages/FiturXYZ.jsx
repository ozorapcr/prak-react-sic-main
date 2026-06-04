import PageHeader from '@/components/PageHeader'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import { FcButtingIn } from 'react-icons/fc'


export default function FiturXYZ() {
    return (
        <div id="dashboard-container">
            <PageHeader title="Dashboard" />
          
        

            <Card className="mt-4 w-[380px]">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Belajar shadcn/ui</CardTitle>
                        <Badge variant="secondary">Baru</Badge>
                    </div>
                    <CardDescription>
                        Contoh penggunaan komponen shadcn/ui di React
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Komponen ini dibuat di branch <strong>setup-shadcn</strong>
                        lalu di-merge ke main.
                    </p>
                </CardContent>

                <CardFooter className="flex gap-2">
                    <Button>Simpan</Button>
                    <Button variant="outline">Batal</Button>
                </CardFooter>
            </Card>

        </div>

    );
}