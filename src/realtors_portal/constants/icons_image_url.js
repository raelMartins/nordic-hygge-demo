import car_park from '/src/realtors_portal/images/icons/amenities_car_park_icon.svg';
import gym from '/src/realtors_portal/images/icons/amenities_gym_icon.svg';
import swimming_pool from '/src/realtors_portal/images/icons/amenities_swimming_pool_icon.svg';
import football_pitch from '/src/realtors_portal/images/icons/amenities_football_pitch_icon.svg';
import recreational_area from '/src/realtors_portal/images/icons/amenities_recreational_area_icon.svg';
import basketball_court from '/src/realtors_portal/images/icons/amenities_basketball_court_icon.svg';
import worship_center from '/src/realtors_portal/images/icons/amenities_worship_center_icon.svg';
import shopping_complex from '/src/realtors_portal/images/icons/amenities_shopping_complex_icon.svg';
import street_lights from '/src/realtors_portal/images/icons/amenities_street_lights_icon.svg';
import garden from '/src/realtors_portal/images/icons/amenities_garden_icon.svg';
import internet_wifi from '/src/realtors_portal/images/icons/amenities_internet_wifi_icon.svg';
import cctv from '/src/realtors_portal/images/icons/amenities_cctv_icon.svg';
import alternative_power_supply from '/src/realtors_portal/images/icons/amenities_alternative_power_supply_icon.svg';
import school from '/src/realtors_portal/images/icons/amenities_school_icon.svg';
import health_facility from '/src/realtors_portal/images/icons/amenities_health_facilities_icon.svg';
import helipad from '/src/realtors_portal/images/icons/amenities_helipad_icon.svg';
import tennis_court from '/src/realtors_portal/images/icons/amenities_tennis_court_icon.svg';
import elevator from '/src/realtors_portal/images/icons/amenities_elevator_icon.svg';
import bar from '/src/realtors_portal/images/icons/amenities_bar_icon.svg';
import lounge from '/src/realtors_portal/images/icons/amenities_lounge_icon.svg';
import beach_front from '/src/realtors_portal/images/icons/amenities_beach_front_icon.svg';
import security from '/src/realtors_portal/images/icons/amenities_security_icon.svg';
import hours_light from '/src/realtors_portal/images/icons/amenities_hours_light_icon.svg';
import golf_course from '/src/realtors_portal/images/icons/amenities_golf_course_icon.svg';
import playground from '/src/realtors_portal/images/icons/amenities_playground_icon.svg';

import spa from '/src/realtors_portal/images/icons/amenities_spa_icon.svg';
import wallet_transaction from '/src/realtors_portal/images/icons/notif_wallet_transaction_icon.svg';
import fractional_ownership from '/src/realtors_portal/images/icons/notif_fractional_ownership_icon.svg';
import home_purchase from '/src/realtors_portal/images/icons/notif_home_purchase_icon.svg';
import requested_tour from '/src/realtors_portal/images/icons/notif_requested_tour_icon.svg';
import welcome from '/src/realtors_portal/images/icons/notif_welcome_icon.svg';
import coownerShipPeopleIcon from '/src/realtors_portal/images/icons/space_coownerShipIcon.svg';
import offerIcon from '/src/realtors_portal/images/icons/space_offerIcon.svg';

export const AMENITIES = {
  car_park,
  gym,
  swimming_pool,
  football_pitch,
  recreational_area,
  reacreational_area: recreational_area,
  basketball_court,
  worship_center,
  shopping_complex,
  street_lights,
  garden,
  internet_wifi,
  cctv,
  alternative_power_supply,
  school,
  health_facility,
  helipad,
  tennis_court,
  elevator,
  bar,
  lounge,
  beach_front,
  security,
  '24_hours_light': hours_light,
  golf_course,
  spa,
  playground,
};

export const NOTIFICATION = {
  refund: wallet_transaction,
  deposit: wallet_transaction,
  withdrawal: wallet_transaction,
  fractional_ownership,
  equity: home_purchase,
  successful: home_purchase,
  'requested tour': requested_tour,
  'inspection request': requested_tour,
  "what's next": welcome,
  "What's next": welcome,
  welcome: welcome,
};

export const SPACE = {
  'Co-Ownership Invitation': {icon: coownerShipPeopleIcon.src, topic: 'Co-ownership'},
  'requested tour': {icon: requested_tour.src, topic: ''},
  'inspection request': {icon: requested_tour.src, topic: ''},
  offer: {icon: offerIcon.src, topic: ''},
};
