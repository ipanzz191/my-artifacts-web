import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// TAMPAL KEY ANDA DI SINI
const supabase = createClient('https://vyoesezaiehpczdtenzt.supabase.co', 'sb_publishable_GO9u8zfyiZnzoOh_a1BKnA_K1SLCr5uA');

export default function Admin() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [list, setList] = useState<any[]>([]);

  useEffect(() => { fetchMidmen(); }, []);

  async function fetchMidmen() {
    const { data } = await supabase.from('midmen').select('*');
    setList(data || []);
  }

  async function simpanMidman() {
    if(!name || !phone) return alert("Isi Nama & Phone!");
    await supabase.from('midmen').insert([{ name, phone, image_url: imageUrl }]);
    alert("Berjaya ditambah!");
    setName(''); setPhone(''); setImageUrl('');
    fetchMidmen();
  }

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin Midman</h1>
      <div className="bg-gray-100 p-6 rounded-xl mb-8 border shadow-sm">
        <input className="w-full p-3 mb-2 border rounded" placeholder="Nama Midman" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full p-3 mb-2 border rounded" placeholder="No WhatsApp (601xxx)" value={phone} onChange={e => setPhone(e.target.value)} />
        <input className="w-full p-3 mb-4 border rounded" placeholder="Link Gambar Profil" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <button onClick={simpanMidman} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold">TAMBAH MIDMAN</button>
      </div>

      <h2 className="text-xl font-bold mb-4">Senarai Semasa:</h2>
      {list.map((m) => (
        <div key={m.id} className="flex items-center gap-4 p-3 border-b">
          <img src={m.image_url || 'https://via.placeholder.com/150'} className="w-14 h-14 rounded-full object-cover border-2 border-green-500 shadow-sm" />
          <div>
            <p className="font-bold text-lg">{m.name}</p>
            <p className="text-gray-500 text-sm">+{m.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
}