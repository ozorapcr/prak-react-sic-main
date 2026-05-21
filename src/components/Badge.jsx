import { useState } from "react";
import { FaBan, FaDollarSign, FaShoppingCart, FaTruck } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";

export default function Components() {
    return (
        <div id="dashboard-container">
            <PageHeader title="Components" />
            <p>Ini halaman components</p>

            <div className="flex gap-2">
                <Button>Simpan</Button>
                <Button type="secondary">Simpan</Button>
                <Button type="success">Simpan</Button>
                <Button type="danger">Simpan</Button>
                <Button type="warning">Simpan</Button>
            </div>

            <div className="flex gap-2 mt-2">
                <Badge type="primary">Selesai</Badge>
                <Badge type="secondary">Prosess</Badge>
                <Badge type="success">Berhasil</Badge>
                <Badge type="danger">gagal</Badge>
                <Badge type="warning">Badge</Badge>
            </div>
        </div>
    );
}