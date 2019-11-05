export const epsg = geojson => {
  const firstCoord = getFirstCoord(geojson)
  const offset = Math.round((183 + firstCoord[0]) / 6)
  return firstCoord[1] > 0
    ? 32600 + offset
    : 32700 + offset
}

export const proj = geojson => {
  const firstCoord = getFirstCoord(geojson)
  const zone = Math.floor((firstCoord[0] + 180) / 6) + 1
  return `+proj=utm +zone=${zone} +${firstCoord[1] >= 0 ? 'north' : 'south'} +datum=WGS84 +units=m +no_defs`
}

const getFirstCoord = geojson => {
  const recurse = coordinates => isNaN(coordinates[0]) ? recurse(coordinates[0]) : coordinates
  const firstCoord = geojson.coordinates 
    ? recurse(geojson.coordinates)
    : geojson.geometry
    ? recurse(geojson.geometry.coordinates)
    : geojson.geometries
    ? recurse(geojson.geometries[0].coordinates)
    : geojson.features
    ? recurse(geojson.features[0].geometry.coordinates)
    : null

  if (!firstCoord) {
    throw new Error('Could not find any coordinates in this GeoJSON')
  }

  return firstCoord
}
