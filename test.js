import test from 'ava'
import { epsg, proj } from './index'

test('Zone from point', t => {
  const code = epsg({ type: 'Point', coordinates: [11.9, 57.7] })
  t.is(code, 32632)
})

test('Zone from feature', t => {
  const code = epsg({ type: "Feature", properties: {}, geometry: { type: 'Point', coordinates: [11.9, 57.7] } })
  t.is(code, 32632)
})

test('Zone from feature collection', t => {
  const code = epsg({
    type: 'FeatureCollection',
    features: [
      { type: "Feature", properties: {}, geometry: { type: 'Point', coordinates: [11.9, 57.7] } }
    ]
  })
  t.is(code, 32632)
})

test('Southern MultiPolygon projection', t => {
  const projDef = proj({"type":"MultiPolygon","coordinates":[[[[-64.3070325,-35.9056278],[-64.3076268,-35.9044204],[-64.3076241,-35.9043866],[-64.3054501,-35.9036302],[-64.30483,-35.9048715],[-64.3070325,-35.9056278]]]]})
  t.is(projDef, '+proj=utm +zone=20 +south +datum=WGS84 +units=m +no_defs')
})
