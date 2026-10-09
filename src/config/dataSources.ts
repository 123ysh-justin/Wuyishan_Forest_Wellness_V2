/**
 * 地图数据源配置（真实 GIS 数据源，详见 DATA_SOURCE_REPORT.md）
 *
 * 影像：EOX Sentinel-2 Cloudless 2024 —— 真实 ESA Sentinel-2 无云拼接影像（10m）
 * 高程：AWS Open Data Terrain Tiles（Terrarium 编码，武夷山图幅实测来源为 NASA SRTM N29E117）
 * 备选高程：Mapterhorn（本机网络实测被拦截，正式部署环境可一键切换）
 */

export const IMAGERY_SOURCES = {
  eoxS2_2024: {
    id: 'eox-s2cloudless-2024',
    name: 'Sentinel-2 无云影像 2024（EOX）',
    type: 'raster' as const,
    tiles: [
      'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2024_3857/default/g/{z}/{y}/{x}.jpg'
    ],
    tileSize: 256,
    maxzoom: 16,
    attribution: '影像 © EOX::Maps Sentinel-2 cloudless 2024（ESA Copernicus 数据）'
  }
}

export const TERRAIN_SOURCES = {
  /** 主用：AWS 开放地形瓦片（实测可用，武夷山图幅为 SRTM 数据） */
  awsTerrarium: {
    id: 'aws-terrarium',
    name: 'AWS Terrain Tiles（SRTM，Terrarium 编码）',
    type: 'raster-dem' as const,
    tiles: [
      'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'
    ],
    tileSize: 256,
    maxzoom: 15,
    encoding: 'terrarium' as const,
    attribution: '高程 © AWS Open Data Terrain Tiles（NASA SRTM 等）'
  },
  /** 备选：Mapterhorn（本机网络被拦截；部署环境可用时把 ACTIVE_TERRAIN 改为 'mapterhorn'） */
  mapterhorn: {
    id: 'mapterhorn',
    name: 'Mapterhorn DEM（Terrarium 编码）',
    type: 'raster-dem' as const,
    tiles: ['https://tiles.mapterhorn.com/{z}/{x}/{y}.webp'],
    tileSize: 512,
    maxzoom: 15,
    encoding: 'terrarium' as const,
    attribution: '高程 © Mapterhorn'
  }
}

/** 当前启用的高程源 */
export const ACTIVE_TERRAIN: keyof typeof TERRAIN_SOURCES = 'awsTerrarium'

/** 研究区初始视角：武夷山国家公园核心地带 */
export const WUYISHAN_VIEW = {
  center: [117.72, 27.72] as [number, number],
  zoom: 10.2,
  pitch: 62,
  bearing: -18
}
