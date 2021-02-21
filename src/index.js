import * as Cesium from 'cesium';
import axios from "axios";
import icon from './images/cesium.png';
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./css/main.css";

// This is simplified version of Cesium's Getting Started tutorial.
// See https://cesium.com/docs/tutorials/getting-started/ for more details.

// initialise cesium viewer
const viewer = new Cesium.Viewer('cesiumContainer');

// billboard modal form
const billboardModalForm = document.getElementById('billboard-form-modal');
const billboardForm = document.getElementById('form');
const openBillboardFormModalButton = document.getElementById('open-billboard-form-modal');
const closeBillboardFormModalButton = document.getElementById('form-modal-close');
const saveBillboardFormModalButton = document.getElementById('form-modal-save');

// Nominatim url
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';

/**
 * Open billboard modal form
 */
function openBillboardFormModal() {
    openModal(billboardModalForm);
}
openBillboardFormModalButton.onclick = openBillboardFormModal;

/**
 * Close billboard modal form
 */
function closeBillboardFormModal() {
    closeModal(billboardModalForm);
}
closeBillboardFormModalButton.onclick = closeBillboardFormModal;

/**
 * Save billboard modal form
 */
async function saveBillboardFormModal() {
    // Get input value
    const cityNameValue = document.getElementById('cityName').value;
    const cityIdValue = document.getElementById('cityId').value;

    // Close modal
    closeModal(billboardModalForm);

    // Call nominatim api then create billboard
    try {
        const response = await callNominatimApi(cityNameValue);
        createBillboard(response.data[0], cityNameValue, cityIdValue);
    } catch (e) {
        console.error(e);
    }
}
saveBillboardFormModalButton.onclick = saveBillboardFormModal;

/**
 * Create billboard
 *
 * @param cityData
 * @param cityName
 * @param cityId
 */
function createBillboard(cityData, cityName, cityId) {
    // Create coordinates
    const cityCoordinates = Cesium.Cartesian3.fromDegrees(parseFloat(cityData.lon), parseFloat(cityData.lat));

    // check if entity already exist
    const entity = pickEntity(viewer, Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cityCoordinates));
    if (entity === undefined) {

        // create billboard
        const creationDate = new Date().toLocaleDateString();
        viewer.entities.add({
            position: cityCoordinates,
            name: cityName,
            description: `<p>City: ${cityName}</p><p>Creation Date: ${creationDate}</p>`,
            billboard: {
                image: icon,
            },
            properties: {
                cityId: cityId,
                cityName: cityName,
                lat: cityData.lat,
                lon: cityData.lon,
                creationDate: creationDate,
            },
            label: {
                id: cityId,
                text: `${cityName} - ${cityId}`,
                eyeOffset: new Cesium.Cartesian3(0.0, 800.0, 0.0)
            }
        });
    } else {
        console.info('Entity already exist');
    }
}

/**
 * Open modal element
 *
 * @param modalElement
 */
function openModal(modalElement) {
    modalElement.classList.remove('unvisible');
    modalElement.classList.add('visible');
}

/**
 * Close modal element
 *
 * @param modalElement
 */
function closeModal(modalElement) {
    modalElement.classList.remove('visible');
    modalElement.classList.add('unvisible');
}

/**
 * Returns the top-most entity at the provided window coordinates
 * or undefined if no entity is at that location.
 *
 * @param viewer
 * @param windowPosition
 * @returns {Cesium.Entity|undefined}
 */
function pickEntity(viewer, windowPosition) {
    const picked = viewer.scene.pick(windowPosition);
    if (picked !== undefined || picked) {
        const id = Cesium.defaultValue(picked.id, picked.primitive.id);
        if (id instanceof Cesium.Entity) {
            return id;
        }
    }
    return undefined;
}

/**
 * Call nominatim api with city name
 *
 * @param cityName
 * @returns {AxiosPromise<any>}
 */
async function callNominatimApi(cityName) {
    return axios(`${NOMINATIM_BASE_URL}?city=${cityName}&limit=1&format=json`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        crossdomain: true,
    });
}
