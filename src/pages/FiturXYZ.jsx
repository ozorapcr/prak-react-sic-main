import PageHeader from '@/components/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FcIdea, 
  FcReading, 
  FcDatabase, 
  FcPieChart,
  FcBriefcase
} from 'react-icons/fc';

export default function FiturXYZ() {
  return (
    <div id="dashboard-container" className="p-6">
      <PageHeader title="✨ Fitur CRM - Sistem Poin & Tier Member" />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center text-4xl">⭐</div>
            <CardTitle>Sistem Poin</CardTitle>
            <CardDescription>1 poin = Rp 1.000</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Poin didapat dari setiap transaksi pembelian
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center text-4xl">🏅</div>
            <CardTitle>Tier Member</CardTitle>
            <CardDescription>Bronze, Silver, Gold, Platinum</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Tier ditentukan berdasarkan total poin
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center text-4xl">💰</div>
            <CardTitle>Diskon Otomatis</CardTitle>
            <CardDescription>0% - 15% sesuai tier</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Diskon berlaku untuk pembelian berikutnya
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center text-4xl">📊</div>
            <CardTitle>Dashboard Member</CardTitle>
            <CardDescription>Lihat poin & riwayat</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Pantau perkembangan poin dan tier
          </CardContent>
        </Card>
      </div>

      {/* Tabel Tier Member */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FcIdea /> Tier Member
          </CardTitle>
          <CardDescription>
            Level keanggotaan berdasarkan total poin yang terkumpul
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Tier</th>
                  <th className="text-left py-2 px-4">Poin Minimal</th>
                  <th className="text-left py-2 px-4">Diskon</th>
                  <th className="text-left py-2 px-4">Icon</th>
                  <th className="text-left py-2 px-4">Badge</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4 font-medium">Bronze</td>
                  <td className="py-2 px-4">0</td>
                  <td className="py-2 px-4">0%</td>
                  <td className="py-2 px-4">🥉</td>
                  <td className="py-2 px-4">
                    <Badge variant="outline" className="bg-orange-100 text-orange-800">
                      Bronze
                    </Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-medium">Silver</td>
                  <td className="py-2 px-4">1.000</td>
                  <td className="py-2 px-4">5%</td>
                  <td className="py-2 px-4">🥈</td>
                  <td className="py-2 px-4">
                    <Badge variant="outline" className="bg-gray-200 text-gray-800">
                      Silver
                    </Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-medium">Gold</td>
                  <td className="py-2 px-4">5.000</td>
                  <td className="py-2 px-4">10%</td>
                  <td className="py-2 px-4">🥇</td>
                  <td className="py-2 px-4">
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Gold
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-medium">Platinum</td>
                  <td className="py-2 px-4">10.000</td>
                  <td className="py-2 px-4">15%</td>
                  <td className="py-2 px-4">👑</td>
                  <td className="py-2 px-4">
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                      Platinum
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <FcDatabase className="mr-1" /> Poin dihitung dari total pembelian setelah diskon
        </CardFooter>
      </Card>

      {/* Fitur Lainnya */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FcBriefcase /> Fitur Lainnya
          </CardTitle>
          <CardDescription>
            Akses cepat ke fitur-fitur CRM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link to="/member-dashboard">
              <Card className="hover:shadow-lg transition cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">🏠</div>
                  <p className="font-medium">Dashboard Member</p>
                  <p className="text-xs text-muted-foreground">Lihat poin & tier</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/checkout">
              <Card className="hover:shadow-lg transition cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">🛒</div>
                  <p className="font-medium">Checkout</p>
                  <p className="text-xs text-muted-foreground">Diskon otomatis</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/order-history">
              <Card className="hover:shadow-lg transition cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">📋</div>
                  <p className="font-medium">Riwayat Pesanan</p>
                  <p className="text-xs text-muted-foreground">Lihat semua transaksi</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Informasi Tambahan */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FcReading /> Informasi
          </CardTitle>
          <CardDescription>
            Cara kerja sistem CRM di aplikasi Sedap
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <span>Setiap transaksi menghasilkan <strong>poin</strong> (1 poin = Rp 1.000)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <span>Poin menentukan <strong>Tier</strong> (Bronze → Silver → Gold → Platinum)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <span>Setiap tier mendapatkan <strong>diskon</strong> untuk pembelian berikutnya</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <span>Diskon dihitung <strong>otomatis</strong> saat checkout</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <span>Member bisa melihat <strong>progress</strong> ke tier berikutnya</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <FcPieChart className="mr-1" /> Fitur CRM ini menggunakan Supabase sebagai database
        </CardFooter>
      </Card>

    </div>
  );
}