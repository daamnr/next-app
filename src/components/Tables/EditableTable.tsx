import React, { useState } from 'react';

const data = [
  {
    "user_id": 1,
    "kontraks": [
      {
        "masa_berlaku_start": "09/08/2023",
        "masa_berlaku_end": "09/12/2023",
        "golongan_pajak": 2,
        "bpjs": [1,2],
        "posisi": "Frontend Developer",
        "cuti_pertahun": 14,
        "jenis_kontrak": 1,
        "minim_jam": 20,
        "catatan" : "dummy catatan 1",
        "pendapatans": [
          {
            "nama_pendapatan": 1,
            "tipe_pendapatan": 3,
            "nominal": 20000
          },
          {
            "nama_pendapatan": 2,
            "tipe_pendapatan": 1,
            "nominal": 25000
          },
          {
            "nama_pendapatan": 1,
            "tipe_pendapatan": 2,
            "nominal": 32000
          }
        ],
        "potongans": [
          {
            "nama_potongan": 2,
            "tipe_potongan": 2,
            "nominal": 40000
          },
          {
            "nama_potongan": 1,
            "tipe_potongan": 1,
            "nominal": 15000
          },
          {
            "nama_potongan": 2,
            "tipe_potongan": 1,
            "nominal": 12000
          }
        ]
      },
      {
        "masa_berlaku_start": "11/08/2023",
        "masa_berlaku_end": "09/12/2023",
        "golongan_pajak": 3,
        "bpjs": [2],
        "posisi": "Backend Developer",
        "cuti_pertahun": 12,
        "jenis_kontrak": 2,
        "minim_jam": 20,
        "catatan" : "dummy catatan 2",
        "pendapatans": [
          {
            "nama_pendapatan": 2,
            "tipe_pendapatan": 1,
            "nominal": 10000
          },
          {
            "nama_pendapatan": 1,
            "tipe_pendapatan": 3,
            "nominal": 25000
          },
          {
            "nama_pendapatan": 2,
            "tipe_pendapatan": 2,
            "nominal": 32000
          }
        ],
        "potongans": [
          {
            "nama_potongan": 2,
            "tipe_potongan": 1,
            "nominal": 40000
          },
          {
            "nama_potongan": 1,
            "tipe_potongan": 2,
            "nominal": 15000
          },
          {
            "nama_potongan": 3,
            "tipe_potongan": 2,
            "nominal": 12000
          }
        ]
      }
    ]
  },
  {
    "user_id": 2,
    "kontraks": [
      {
        "masa_berlaku_start": "10/01/2023",
        "masa_berlaku_end": "10/01/2024",
        "golongan_pajak": 5,
        "bpjs": [1,3],
        "posisi": "UI Designer",
        "cuti_pertahun": 13,
        "jenis_kontrak": 3,
        "minim_jam": 20,
        "catatan" : "dummy catatan 3",
        "pendapatans": [
          {
            "nama_pendapatan": 1,
            "tipe_pendapatan": 2,
            "nominal": 8000
          },
          {
            "nama_pendapatan": 2,
            "tipe_pendapatan": 1,
            "nominal": 3000
          }
        ],
        "potongans": [
          {
            "nama_potongan": 2,
            "tipe_potongan": 1,
            "nominal": 1500
          },
          {
            "nama_potongan": 1,
            "tipe_potongan": 1,
            "nominal": 200
          }
        ]
      }
    ]
  }
];

const EditableTable = () => {
  const [employeeData, setEmployeeData] = useState(data);

const onChangeInput = (employeeId: number, property: string | number) => (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  setEmployeeData(prevEmployeeData => {
    return prevEmployeeData.map(item =>
      item.user_id === employeeId
        ? {
            ...item,
            kontraks: item.kontraks.map(kontrak => ({
              ...kontrak,
              pendapatans: kontrak.pendapatans.map(pendapatan =>
                pendapatan.nama_pendapatan === property || pendapatan.tipe_pendapatan === property
                  ? { ...pendapatan, nominal: numericValue }
                  : pendapatan
              )
            }))
          }
        : item
    );
  });
};

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-transparent">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nama</th>
            <th className="border border-gray-300 px-4 py-2">Tipe</th>
            <th className="border border-gray-300 px-4 py-2">Nominal</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((data) => (
            <tr key={data.user_id}>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  name="name"
                  value={data.kontraks[0].pendapatans[0].nama_pendapatan.toString()}
                  type="text"
                  onChange={onChangeInput(data.user_id, 'nama')}
                  className="w-full focus:outline-none bg-transparent"
                  placeholder="Type Name"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  name="email"
                  value={data.kontraks[0].pendapatans[0].tipe_pendapatan.toString()}
                  type="text"
                  onChange={onChangeInput(data.user_id, 'tipe')}
                  className="w-full focus:outline-none bg-transparent"
                  placeholder="Type Email"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  name="position"
                  value={`Rp ${data.kontraks[0].pendapatans[0].nominal.toLocaleString()}`}
                  type="text"
                  onChange={onChangeInput(data.user_id, 'nominal')}
                  className="w-full focus:outline-none bg-transparent"
                  placeholder="Type Position"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
