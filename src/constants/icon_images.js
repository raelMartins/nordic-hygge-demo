// light icons
import car_park from '../images/icons/light_amenities/amenities_car_park_icon.svg';
import gym from '../images/icons/light_amenities/amenities_gym_icon.svg';
import swimming_pool from '../images/icons/light_amenities/amenities_swimming_pool_icon.svg';
import football_pitch from '../images/icons/light_amenities/amenities_football_pitch_icon.svg';
import recreational_area from '../images/icons/light_amenities/amenities_recreational_area_icon.svg';
import basketball_court from '../images/icons/light_amenities/amenities_basketball_court_icon.svg';
import worship_center from '../images/icons/light_amenities/amenities_worship_center_icon.svg';
import shopping_complex from '../images/icons/light_amenities/amenities_shopping_complex_icon.svg';
import street_lights from '../images/icons/light_amenities/amenities_street_lights_icon.svg';
import garden from '../images/icons/light_amenities/amenities_garden_icon.svg';
import internet_wifi from '../images/icons/light_amenities/amenities_internet_wifi_icon.svg';
import cctv from '../images/icons/light_amenities/amenities_cctv_icon.svg';
import alternative_power_supply from '../images/icons/light_amenities/amenities_alternative_power_supply_icon.svg';
import school from '../images/icons/light_amenities/amenities_school_icon.svg';
import health_facility from '../images/icons/light_amenities/amenities_health_facilities_icon.svg';
import helipad from '../images/icons/light_amenities/amenities_helipad_icon.svg';
import tennis_court from '../images/icons/light_amenities/amenities_tennis_court_icon.svg';
import elevator from '../images/icons/light_amenities/amenities_elevator_icon.svg';
import bar from '../images/icons/light_amenities/amenities_bar_icon.svg';
import lounge from '../images/icons/light_amenities/amenities_lounge_icon.svg';
import beach_front from '../images/icons/light_amenities/amenities_beach_front_icon.svg';
import security from '../images/icons/light_amenities/amenities_security_icon.svg';
import hours_light from '../images/icons/light_amenities/amenities_hours_light_icon.svg';
import golf_course from '../images/icons/light_amenities/amenities_golf_course_icon.svg';
import playground from '../images/icons/light_amenities/amenities_playground_icon.svg';
import spa from '../images/icons/light_amenities/amenities_spa_icon.svg';

// dark icons
import car_park_dark from '../images/icons/dark_amenities/amenities_car_park_icon.svg';
import gym_dark from '../images/icons/dark_amenities/amenities_gym_icon.svg';
import swimming_pool_dark from '../images/icons/dark_amenities/amenities_swimming_pool_icon.svg';
import football_pitch_dark from '../images/icons/dark_amenities/amenities_football_pitch_icon.svg';
import recreational_area_dark from '../images/icons/dark_amenities/amenities_recreational_area_icon.svg';
import basketball_court_dark from '../images/icons/dark_amenities/amenities_basketball_court_icon.svg';
import worship_center_dark from '../images/icons/dark_amenities/amenities_worship_center_icon.svg';
import shopping_complex_dark from '../images/icons/dark_amenities/amenities_shopping_complex_icon.svg';
import street_lights_dark from '../images/icons/dark_amenities/amenities_street_lights_icon.svg';
import garden_dark from '../images/icons/dark_amenities/amenities_garden_icon.svg';
import internet_wifi_dark from '../images/icons/dark_amenities/amenities_internet_wifi_icon.svg';
import cctv_dark from '../images/icons/dark_amenities/amenities_cctv_icon.svg';
import alternative_power_supply_dark from '../images/icons/dark_amenities/amenities_alternative_power_supply_icon.svg';
import school_dark from '../images/icons/dark_amenities/amenities_school_icon.svg';
import health_facility_dark from '../images/icons/dark_amenities/amenities_health_facilities_icon.svg';
import helipad_dark from '../images/icons/dark_amenities/amenities_helipad_icon.svg';
import tennis_court_dark from '../images/icons/dark_amenities/amenities_tennis_court_icon.svg';
import elevator_dark from '../images/icons/dark_amenities/amenities_elevator_icon.svg';
import bar_dark from '../images/icons/dark_amenities/amenities_bar_icon.svg';
import lounge_dark from '../images/icons/dark_amenities/amenities_lounge_icon.svg';
import beach_front_dark from '../images/icons/dark_amenities/amenities_beach_front_icon.svg';
import security_dark from '../images/icons/dark_amenities/amenities_security_icon.svg';
import hours_light_dark from '../images/icons/dark_amenities/amenities_hours_light_icon.svg';
import golf_course_dark from '../images/icons/dark_amenities/amenities_golf_course_icon.svg';
import playground_dark from '../images/icons/dark_amenities/amenities_playground_icon.svg';
import spa_dark from '../images/icons/dark_amenities/amenities_spa_icon.svg';

import wallet from '../images/notification_light/empty-wallet.svg';
import fractional from '../images/notification_light/graph.svg';
import offer from '../images/notification_light/message-text.svg';
import coOwner from '../images/notification_light/people.svg';
import tour from '../images/notification_light/route-square.svg';
import purchase from '../images/notification_light/shopping-cart.svg';
import story from '../images/notification_light/story.svg';

import wallet_dark from '../images/notification_dark/empty-wallet.svg';
import fractional_dark from '../images/notification_dark/graph.svg';
import offer_dark from '../images/notification_dark/message-text.svg';
import coOwner_dark from '../images/notification_dark/people.svg';
import tour_dark from '../images/notification_dark/route-square.svg';
import purchase_dark from '../images/notification_dark/shopping-cart.svg';
import story_dark from '../images/notification_dark/story.svg';

import {appCurrentTheme} from '../utils/localStorage';
import {LIGHT} from './names';

// appCurrentTheme === DARK_BLUE
console.log(appCurrentTheme);
export const AMENITIES = {
  car_park: !appCurrentTheme || appCurrentTheme === LIGHT ? car_park_dark : car_park,
  gym: !appCurrentTheme || appCurrentTheme === LIGHT ? gym_dark : gym,
  swimming_pool: !appCurrentTheme || appCurrentTheme === LIGHT ? swimming_pool_dark : swimming_pool,
  football_pitch:
    !appCurrentTheme || appCurrentTheme === LIGHT ? football_pitch_dark : football_pitch,
  recreational_area:
    !appCurrentTheme || appCurrentTheme === LIGHT ? recreational_area_dark : recreational_area,
  reacreational_area:
    !appCurrentTheme || appCurrentTheme === LIGHT ? recreational_area_dark : recreational_area,
  basketball_court:
    !appCurrentTheme || appCurrentTheme === LIGHT ? basketball_court_dark : basketball_court,
  worship_center:
    !appCurrentTheme || appCurrentTheme === LIGHT ? worship_center_dark : worship_center,
  shopping_complex:
    !appCurrentTheme || appCurrentTheme === LIGHT ? shopping_complex_dark : shopping_complex,
  street_lights: !appCurrentTheme || appCurrentTheme === LIGHT ? street_lights_dark : street_lights,
  garden: !appCurrentTheme || appCurrentTheme === LIGHT ? garden_dark : garden,
  internet_wifi: !appCurrentTheme || appCurrentTheme === LIGHT ? internet_wifi_dark : internet_wifi,
  cctv: !appCurrentTheme || appCurrentTheme === LIGHT ? cctv_dark : cctv,
  alternative_power_supply:
    !appCurrentTheme || appCurrentTheme === LIGHT
      ? alternative_power_supply_dark
      : alternative_power_supply,
  school: !appCurrentTheme || appCurrentTheme === LIGHT ? school_dark : school,
  health_facility:
    !appCurrentTheme || appCurrentTheme === LIGHT ? health_facility_dark : health_facility,
  helipad: !appCurrentTheme || appCurrentTheme === LIGHT ? helipad_dark : helipad,
  tennis_court: !appCurrentTheme || appCurrentTheme === LIGHT ? tennis_court_dark : tennis_court,
  elevator: !appCurrentTheme || appCurrentTheme === LIGHT ? elevator_dark : elevator,
  bar: !appCurrentTheme || appCurrentTheme === LIGHT ? bar_dark : bar,
  lounge: !appCurrentTheme || appCurrentTheme === LIGHT ? lounge_dark : lounge,
  beach_front: !appCurrentTheme || appCurrentTheme === LIGHT ? beach_front_dark : beach_front,
  security: !appCurrentTheme || appCurrentTheme === LIGHT ? security_dark : security,
  '24_hours_light': !appCurrentTheme || appCurrentTheme === LIGHT ? hours_light_dark : hours_light,
  golf_course: !appCurrentTheme || appCurrentTheme === LIGHT ? golf_course_dark : golf_course,
  spa: !appCurrentTheme || appCurrentTheme === LIGHT ? spa_dark : spa,
  playground: !appCurrentTheme || appCurrentTheme === LIGHT ? playground_dark : playground,
};

export const NOTIFICATION = {
  wallet_transaction: !appCurrentTheme || appCurrentTheme === LIGHT ? wallet_dark : wallet,
  fractional_ownership:
    !appCurrentTheme || appCurrentTheme === LIGHT ? fractional_dark : fractional,
  home_purchase: !appCurrentTheme || appCurrentTheme === LIGHT ? purchase_dark : purchase,
  successful_purchase: !appCurrentTheme || appCurrentTheme === LIGHT ? purchase_dark : purchase,
  successful: !appCurrentTheme || appCurrentTheme === LIGHT ? purchase_dark : purchase,
  requested_tour: !appCurrentTheme || appCurrentTheme === LIGHT ? tour_dark : tour,
  inspection_request: !appCurrentTheme || appCurrentTheme === LIGHT ? tour_dark : tour,
  scheduled_inspection: !appCurrentTheme || appCurrentTheme === LIGHT ? tour_dark : tour,
  equity: !appCurrentTheme || appCurrentTheme === LIGHT ? fractional_dark : fractional,
  request_a_tour: !appCurrentTheme || appCurrentTheme === LIGHT ? tour_dark : tour,
  requested_tour: !appCurrentTheme || appCurrentTheme === LIGHT ? tour_dark : tour,
  schedule: !appCurrentTheme || appCurrentTheme === LIGHT ? offer_dark : offer,
  co_ownership: !appCurrentTheme || appCurrentTheme === LIGHT ? coOwner_dark : coOwner,
  co_ownership_invitation: !appCurrentTheme || appCurrentTheme === LIGHT ? coOwner_dark : coOwner,
  "what's_next": !appCurrentTheme || appCurrentTheme === LIGHT ? story_dark : story,
};
