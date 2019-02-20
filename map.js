console.log("Hello, world!")
'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoibGJnMjEzNyIsImEiOiJjanNjcG45NXAwNDBjNDNtanBxNG9jb3J2In0.TeHno3_P-gn0vbkpafaOvg'
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v10',
    center: [-38.52999,-13.00827],
    zoom: 1,
    pitch: 45
})

// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
    showCompass: true
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

// add the scale to your map
map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {

    // create new variables to store the attributes we're interested in from the event
    let lng = event.coords.longitude
    let lat = event.coords.latitude

    // debug
    console.log('geolocated:', lng, lat)

    // format lng lat values and display them on our 'info' element
    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

map.on('click', function(event) {

    let lng = event.lngLat.lng
    let lat = event.lngLat.lat

    console.log("clicked:", lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

let marker = new mapboxgl.Marker()
marker.setLngLat([-38.52999,-13.00827])
marker.addTo(map)

let popup = new mapboxgl.Popup()
popup.setHTML('Salvador 1992-2009<br /><img src="http://www.girometropolitano.com.br/wp-content/uploads/2018/03/salvador-ba.jpg" />')
marker.setPopup(popup)

let data = [
    {
        location: [-87.60582,41.87331],
        content: 'Chicago 2009-2011<br /><img src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator-usa.com/article/2017/12/18/the-future-of-food-is-being-written-in-chicago-not-austin-or-boulder-cfbn/7663952-1-eng-GB/The-future-of-food-is-being-written-in-Chicago-not-Austin-or-Boulder-CFBN_wrbm_large.jpg" />'
    },
    {
        location: [-73.95936,40.80610],
        content: 'New York 2018-2019<br /><img src="https://dynaimage.cdn.cnn.com/cnn/q_auto,w_727,c_fit/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F171218123656-01-super-slender-skyscrapers-new-york-restricted-tease.jpg" />'
    },
    {
        location: [-122.65913,45.52134],
        content: 'Portland 2016--2018<br /><img src="https://cdn-images-1.medium.com/max/1600/1*ekX7oDSdB_gcZyW9qzr-eA.jpeg" />'
         },
    {
        location: [-4.12865,40.94563],
        content: 'Segovia 2012-2016<br /><img src="https://cdn.getyourguide.com/img/tour_img-1195469-145.jpg" />'
         },
    {
        location: [121.44749,31.16738],
        content: 'Shanghai 2015<br /><img src="https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />'
    },
    { 

          location: [2.17616,41.40494],
        content: 'Barcelona 2014<br /><img src="https://www.shortholidaysandgetaways.com/wp-content/uploads/2018/07/weekend-in-Barcelona1.jpg" />'

         },
    ]

data.forEach(function(d) {

    let marker = new mapboxgl.Marker()    
    marker.setLngLat(d.location)
    marker.addTo(map)  

    let popup = new mapboxgl.Popup()
    popup.setHTML(d.content)
    marker.setPopup(popup)

})