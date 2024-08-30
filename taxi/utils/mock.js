const mockData = {
  "data": {
    "waitingTimes": [
      "最快3分钟接驾",
      "最快2分钟接驾",
      "最快2分钟接驾",
      "最快1分钟接驾",
      "最快2分钟接驾",
      "最快4分钟接驾",
      "最快3分钟接驾",
      "最快5分钟接驾",
      "最快3分钟接驾",
      "附近暂无车可用，请稍等"
    ],
    "drivers": [{
        "id": "0",
        "name": "赵师傅",
        "stars": "3.2 1w+单",
        "Cartnumber": "赣A30H75",
        "cart": "黑色●宝马Q4"
      },
      {
        "id": "1",
        "name": "钱师傅",
        "stars": "4.8 3w+单",
        "Cartnumber": "赣A66666",
        "cart": "红色●路虎Q5"
      },
      {
        "id": "2",
        "name": "孙师傅",
        "stars": "5.0 5w+单",
        "Cartnumber": "赣A365K2",
        "cart": "蓝色●奔驰Q3"
      },
      {
        "id": "3",
        "name": "李师傅",
        "stars": "4.9 4w+单",
        "Cartnumber": "赣A85IHG",
        "cart": "白色●宝马Q1"
      },
      {
        "id": "4",
        "name": "周师傅",
        "stars": "4.7 3w+单",
        "Cartnumber": "赣AHGN42",
        "cart": "白色●大众Q3"
      },
      {
        "id": "5",
        "name": "吴师傅",
        "stars": "4.5 3w+单",
        "Cartnumber": "赣A88888",
        "cart": "黑色●哈福Q10"
      }
    ],
    "navData": [{
        "id": "0",
        "name": "快车",
        "url": "/assets/images/cart1.png"
      },
      {
        "id": "1",
        "name": "专车",
        "url": "/assets/images/cart2.png"
      },
      {
        "id": "2",
        "name": "出租车",
        "url": "/assets/images/cart3.png"
      },
      {
        "id": "3",
        "name": "顺风车",
        "url": "/assets/images/cart4.png"
      },
      {
        "id": "4",
        "name": "公交",
        "url": "/assets/images/cart5.png"
      },
      {
        "id": "5",
        "name": "代驾",
        "url": "/assets/images/cart6.png"
      },
      {
        "id": "6",
        "name": "自驾租车",
        "url": "/assets/images/cart7.png"
      },
      {
        "id": "7",
        "name": "二手车",
        "url": "/assets/images/cart8.png"
      }
    ],
    "imgUrls": [
      '/assets/images/swiper-1.png',
      '/assets/images/swiper-2.png',
      '/assets/images/swiper-3.png'
    ],
    "cost": [{
        "id": "0",
        "name": "现在出发",
        "url": "/assets/images/time.png"
      },
      {
        "id": "1",
        "name": "换乘车人",
        "url": "/assets/images/people.png"
      },
      {
        "id": "2",
        "name": "个人支付",
        "url": "/assets/images/play.png"
      }
    ],
    "reasons": [{
        "value": "0",
        "name": "行程有变，暂时不需要用车",
        "checked": false
      },
      {
        "value": "1",
        "name": "赶时间，换用其它交通工具",
        "checked": false
      },
      {
        "value": "2",
        "name": "平台派单太远",
        "checked": false
      },
      {
        "value": "3",
        "name": "司机以各种理由不来接我",
        "checked": false
      },
      {
        "value": "4",
        "name": "联系不上司机",
        "checked": false
      },
      {
        "value": "5",
        "name": "我找不到终点",
        "checked": false
      }
    ],
    "moreReason": [
      {
        "value": "6",
        "name": '司机未在规定的时间到达站点',
        "checked": false
      },{
        "value": "7",
        "name": '司机找不到上车地点',
        "checked": false
      },{
        "value": "8",
        "name": '司机要求加价或现金交易',
        "checked": false
      },
      {
        "value": "9",
        "name": '司机服务态度恶劣',
        "checked": false
      },
      {
        "value": "10",
        "name": '不是订单显示车辆或司机',
        "checked": false
      },
      {
        "value": "11",
        "name": '其他',
        "checked": false
      }
    ]
  }
}

const mockData_en = {
  "data": {
    "waitingTimes": [
      "Pick-up in as fast as 3 minutes.",
      "Pick-up in as fast as 2 minutes.",
      "Pick-up in as fast as 2 minutes.",
      "Pick-up in as fast as 1 minute.",
      "Pick-up in as fast as 2 minutes.",
      "Pick-up in as fast as 4 minutes.",
      "Pick-up in as fast as 3 minutes.",
      "Pick-up in as fast as 5 minutes.",
      "Pick-up in as fast as 3 minutes.",
      "No available cars nearby. Please wait."
    ],
    "drivers": [{
        "id": "0",
        "name": "John",
        "stars": "3.2 10k+ orders",
        "Cartnumber": "A30H75",
        "cart": "Black ● BMW Q4"
      },
      {
        "id": "1",
        "name": "Michael",
        "stars": "4.8 30k+ orders",
        "Cartnumber": "A66666",
        "cart": "Red ● Land Rover Q5"
      },
      {
        "id": "2",
        "name": "David",
        "stars": "5.0 50k+ orders",
        "Cartnumber": "A365K2",
        "cart": "Blue ● Mercedes-Benz Q3"
      },
      {
        "id": "3",
        "name": "James",
        "stars": "4.9 40k+ orders",
        "Cartnumber": "A85IHG",
        "cart": "White ● BMW Q1"
      },
      {
        "id": "4",
        "name": "Robert",
        "stars": "4.7 30k+ orders",
        "Cartnumber": "AHGN42",
        "cart": "White ● Volkswagen Q3"
      },
      {
        "id": "5",
        "name": "Driver Wu",
        "stars": "4.5 30k+ orders",
        "Cartnumber": "A88888",
        "cart": "Black ● Haval Q10"
      }
    ],
    "navData": [{
        "id": "0",
        "name": "Express",
        "url": "/assets/images/cart1.png"
      },
      {
        "id": "1",
        "name": "Premium",
        "url": "/assets/images/cart2.png"
      },
      {
        "id": "2",
        "name": "Taxi",
        "url": "/assets/images/cart3.png"
      },
      {
        "id": "3",
        "name": "Hitch ride",
        "url": "/assets/images/cart4.png"
      },
      {
        "id": "4",
        "name": "Bus",
        "url": "/assets/images/cart5.png"
      },
      {
        "id": "5",
        "name": "Designated driving",
        "url": "/assets/images/cart6.png"
      },
      {
        "id": "6",
        "name": "Car rental",
        "url": "/assets/images/cart7.png"
      },
      {
        "id": "7",
        "name": "Used cars",
        "url": "/assets/images/cart8.png"
      }
    ],
    "imgUrls": [
      '/assets/images/swiper-en-1.png',
      '/assets/images/swiper-en-2.png'
    ],
    "cost": [{
        "id": "0",
        "name": "Start now",
        "url": "/assets/images/time.png"
      },
      {
        "id": "1",
        "name": "Change passenger",
        "url": "/assets/images/people.png"
      },
      {
        "id": "2",
        "name": "Make payment",
        "url": "/assets/images/play.png"
      }
    ],
    "reasons": [{
        "value": "0",
        "name": "Plans changed, no car needed.",
        "checked": false
      },
      {
        "value": "1",
        "name": "In a hurry, using another means of transportation.",
        "checked": false
      },
      {
        "value": "2",
        "name": "Long wait times.",
        "checked": false
      },
      {
        "value": "3",
        "name": "The driver refuses to pick me up.",
        "checked": false
      },
      {
        "value": "4",
        "name": "Can't reach driver.",
        "checked": false
      },
      {
        "value": "5",
        "name": "Can't find destination.",
        "checked": false
      }
    ],
    "moreReason": [
      {
        "value": "6",
        "name": 'Driver late.',
        "checked": false
      },
      {
        "value": "7",
        "name": "Driver can't find pickup spot.",
        "checked": false
      },
      {
        "value": "8",
        "name": 'Driver demands extra charges or cash.',
        "checked": false
      },
      {
        "value": "9",
        "name": 'Poor driving behaviors.',
        "checked": false
      },
      {
        "value": "10",
        "name": "Vehicle or driver doesn't match order.",
        "checked": false
      },
      {
        "value": "11",
        "name": 'Others',
        "checked": false
      }
    ]
  }
}

const mockData_id = {
  "data": {
    "waitingTimes": [
      "Penjemputan dalam 3 menit.",
      "Penjemputan dalam 2 menit.",
      "Penjemputan dalam 2 menit.",
      "Penjemputan dalam 1 menit.",
      "Penjemputan dalam 2 menit.",
      "Penjemputan dalam 4 menit.",
      "Penjemputan dalam 3 menit.",
      "Penjemputan dalam 5 menit.",
      "Penjemputan dalam 3 menit.",
      "Tidak tersedia mobil di sekitar. Harap tunggu."
    ],
    "drivers": [{
      "id": "0",
      "name": "John",
      "stars": "3.2 10k+ pesanan",
      "Cartnumber": "A30H75",
      "cart": "BMW Q4 ● Hitam"
    },
      {
        "id": "1",
        "name": "Michael",
        "stars": "4.8 30k+ pesanan",
        "Cartnumber": "A66666",
        "cart": "Land Rover Q5 ● Merah"
      },
      {
        "id": "2",
        "name": "David",
        "stars": "5.0 50k+ pesanan",
        "Cartnumber": "A365K2",
        "cart": "Mercedes-Benz Q3 ● Biru"
      },
      {
        "id": "3",
        "name": "James",
        "stars": "4.9 40k+ pesanan",
        "Cartnumber": "A85IHG",
        "cart": "BMW Q1 ● Putih"
      },
      {
        "id": "4",
        "name": "Robert",
        "stars": "4.7 30k+ pesanan",
        "Cartnumber": "AHGN42",
        "cart": "Volkswagen Q3 ● Putih"
      },
      {
        "id": "5",
        "name": "Driver Wu",
        "stars": "4.5 30k+ pesanan",
        "Cartnumber": "A88888",
        "cart": "Haval Q10 ● Hitam"
      }
    ],
    "navData": [{
      "id": "0",
      "name": "Cepat",
      "url": "/assets/images/cart1.png"
    },
      {
        "id": "1",
        "name": "Premium",
        "url": "/assets/images/cart2.png"
      },
      {
        "id": "2",
        "name": "Taksi",
        "url": "/assets/images/cart3.png"
      },
      {
        "id": "3",
        "name": "Kendaraan tumpangan",
        "url": "/assets/images/cart4.png"
      },
      {
        "id": "4",
        "name": "Bus",
        "url": "/assets/images/cart5.png"
      },
      {
        "id": "5",
        "name": "Tujuan mengemudi",
        "url": "/assets/images/cart6.png"
      },
      {
        "id": "6",
        "name": "Persewaan mobil",
        "url": "/assets/images/cart7.png"
      },
      {
        "id": "7",
        "name": "Mobil yang digunakan",
        "url": "/assets/images/cart8.png"
      }
    ],
    "imgUrls": [
      '/assets/images/swiper-id-1.png',
      '/assets/images/swiper-id-2.png'
    ],
    "cost": [{
      "id": "0",
      "name": "Mulai sekarang",
      "url": "/assets/images/time.png"
    },
      {
        "id": "1",
        "name": "Ganti penumpang",
        "url": "/assets/images/people.png"
      },
      {
        "id": "2",
        "name": "Lakukan pembayaran",
        "url": "/assets/images/play.png"
      }
    ],
    "reasons": [{
      "value": "0",
      "name": "Rencana berubah, mobil yang diperlukan tidak ada.",
      "checked": false
    },
      {
        "value": "1",
        "name": "Jika terburu-buru, gunakan sarana transportasi lain.",
        "checked": false
      },
      {
        "value": "2",
        "name": "Waktu tunggu lama.",
        "checked": false
      },
      {
        "value": "3",
        "name": "Pengemudi menolak penjemputan.",
        "checked": false
      },
      {
        "value": "4",
        "name": "Pengemudi tidak dapat dihubungi.",
        "checked": false
      },
      {
        "value": "5",
        "name": "Destinasi tidak dapat ditemukan.",
        "checked": false
      }
    ],
    "moreReason": [
      {
        "value": "6",
        "name": 'Pengemudi telat.',
        "checked": false
      },{
        "value": "7",
        "name": 'Pengemudi tidak dapat menemukan titik penjemputan.',
        "checked": false
      },{
        "value": "8",
        "name": 'Pengemudi meminta biaya atau uang tambahan.',
        "checked": false
      },
      {
        "value": "9",
        "name": 'Perilaku mengemudi buruk.',
        "checked": false
      },
      {
        "value": "10",
        "name": 'Kendaraan atau pengemudi tidak sesuai pesanan.',
        "checked": false
      },
      {
        "value": "11",
        "name": 'Lainnya',
        "checked": false
      }
    ]
  }
}

const mockData_fr = {
  "data": {
    "waitingTimes": [
      "Ramassage en 3 minutes.",
      "Ramassage en 2 minutes.",
      "Ramassage en 2 minutes.",
      "Ramassage en 1 minute.",
      "Ramassage en 2 minutes.",
      "Ramassage en 4 minutes.",
      "Ramassage en 3 minutes.",
      "Ramassage en 5 minutes.",
      "Ramassage en 3 minutes.",
      "Aucune voiture disponible à proximité. Veuillez patienter."
    ],
    "drivers": [{
      "id": "0",
      "name": "John",
      "stars": "3.2 Commandes de plus de 10 000",
      "Cartnumber": "A30H75",
      "cart": "Noir ● BMW Q4"
    },
      {
        "id": "1",
        "name": "Michael",
        "stars": "4.8 Commandes de plus de 30 000",
        "Cartnumber": "A66666",
        "cart": "Rouge ● Land Rover Q5"
      },
      {
        "id": "2",
        "name": "David",
        "stars": "5.0 Commandes de plus de 50 000",
        "Cartnumber": "A365K2",
        "cart": "Bleu ● Mercedes-Benz Q3"
      },
      {
        "id": "3",
        "name": "James",
        "stars": "4.9 Commandes de plus de 40 000",
        "Cartnumber": "A85IHG",
        "cart": "White ● BMW Q1"
      },
      {
        "id": "4",
        "name": "Robert",
        "stars": "4.7 Commandes de plus de 30 000",
        "Cartnumber": "AHGN42",
        "cart": "Blanc ● Volkswagen Q3"
      },
      {
        "id": "5",
        "name": "Chauffeur Wu",
        "stars": "4.5 Commandes de plus de 30 000",
        "Cartnumber": "A88888",
        "cart": "Noir ● Haval Q10"
      }
    ],
    "navData": [{
      "id": "0",
      "name": "Express",
      "url": "/assets/images/cart1.png"
    },
      {
        "id": "1",
        "name": "Premium",
        "url": "/assets/images/cart2.png"
      },
      {
        "id": "2",
        "name": "Taxi",
        "url": "/assets/images/cart3.png"
      },
      {
        "id": "3",
        "name": "Faire du stop",
        "url": "/assets/images/cart4.png"
      },
      {
        "id": "4",
        "name": "Bus",
        "url": "/assets/images/cart5.png"
      },
      {
        "id": "5",
        "name": "Conduite désignée",
        "url": "/assets/images/cart6.png"
      },
      {
        "id": "6",
        "name": "Location de voitures",
        "url": "/assets/images/cart7.png"
      },
      {
        "id": "7",
        "name": "Voitures d'occasion",
        "url": "/assets/images/cart8.png"
      }
    ],
    "imgUrls": [
      '/assets/images/swiper-fr-1.png',
      '/assets/images/swiper-fr-2.png'
    ],
    "cost": [{
      "id": "0",
      "name": "Commencer maintenant",
      "url": "/assets/images/time.png"
    },
      {
        "id": "1",
        "name": "Modifier le passager",
        "url": "/assets/images/people.png"
      },
      {
        "id": "2",
        "name": "Effectuer le paiement",
        "url": "/assets/images/play.png"
      }
    ],
    "reasons": [{
      "value": "0",
      "name": "Les plans ont changé, pas besoin de voiture.",
      "checked": false
    },
      {
        "value": "1",
        "name": "Pressé, autre moyen de transport utilisé.",
        "checked": false
      },
      {
        "value": "2",
        "name": "Longs délais d'attente.",
        "checked": false
      },
      {
        "value": "3",
        "name": "Le chauffeur refuse de venir me chercher.",
        "checked": false
      },
      {
        "value": "4",
        "name": "Impossible de joindre le chauffeur.",
        "checked": false
      },
      {
        "value": "5",
        "name": "Impossible de trouver la destination.",
        "checked": false
      }
    ],
    "moreReason": [
      {
        "value": "6",
        "name": "Chauffeur en retard.",
        "checked": false
      },{
        "value": "7",
        "name": "Le chauffeur ne trouve pas le point de ramassage.",
        "checked": false
      },{
        "value": "8",
        "name": "Le chauffeur exige des frais supplémentaires ou de l'argent liquide.",
        "checked": false
      },
      {
        "value": "9",
        "name": "Mauvais comportements au volant.",
        "checked": false
      },
      {
        "value": "10",
        "name": "Le véhicule ou le chauffeur ne correspond pas à la commande.",
        "checked": false
      },
      {
        "value": "11",
        "name": "Autres",
        "checked": false
      }
    ]
  }
}

export default {
  mockData,
  mockData_en,
  mockData_id,
  mockData_fr
}