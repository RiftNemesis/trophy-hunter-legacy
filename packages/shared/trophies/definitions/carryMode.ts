import SCORES from '../scores';

const carryMode = {
  name: 'carryMode',
  title: 'Carry Mode',
  description: 'Win a game where you have more than half of your teams kills.',
  svgPath:
    'M256 22.115c-5.825 0-11.563.366-17.193 1.074l25.27 19.44 27.44-15.832A136.438 136.438 0 0 0 256 22.115zm-31.406 3.64C164.628 39.899 120.115 93.66 120.115 158c0 70.687 53.73 128.608 122.65 135.244.11-.089.213-.183.323-.271 8.263-6.629 19.152-10.972 31.252-12.305 6.22-.685 12.228-.512 17.822.457l.006-.025v-.002c1.954-7.778 6.776-13.879 12.527-17.332 4.314-2.59 8.978-3.837 13.528-4.137 1.516-.1 3.022-.094 4.496.002 5.895.383 11.445 2.11 16.095 5.584.123.092.244.195.366.29 31.612-24.477 52.098-62.602 52.681-105.62-6.228-5.54-16.99-15.23-18.4-17.346-1.987-2.98-21.852-22.348-21.852-22.348l-44.199-2.484 19.865 24.336-26.818 11.422-20.494-27.983 24.85 59.018-16.856 67.424-33.713-1.406-14.748-62.506-53.379-11.239 19.666-58.996h69.082l3.41-6.275-36.312-19.03-41.799 18.985-.701-41.437s21.068-18.964 21.068-24.582c0-3.13 2.132-12.118 4.063-19.682zm95.91 251.806c-2.437.009-4.81.597-6.543 1.638-1.982 1.19-3.436 2.711-4.334 6.287l-.006.018-13.79 53.928-8.073-1.25c-12.118-1.876-25.705-2.017-32.533-1.07-4.91 1.625-7.226 4.484-7.848 6.286-.635 1.842-.734 2.198 1.135 3.5.717.457 5.872 2.645 12.074 4.186 6.256 1.554 13.908 2.898 21.277 3.61 7.37.71 14.537.749 19.438.023 4.9-.726 5.96-2.624 5.191-.912 13.432-29.903 16.61-45.388 21.844-74.057-.08-.024-.02.092-.293-.111-1.067-.797-3.7-1.864-6.492-2.045-.35-.023-.699-.033-1.047-.031zm-40.055 20.785c-1.604.011-3.25.106-4.926.29-8.933.985-16.716 4.342-21.64 8.292-4.924 3.95-6.649 7.762-6.438 10.965a8.07 8.07 0 0 0 .633 2.617 37.532 37.532 0 0 1 2.498-.854l.582-.174.602-.093c8.147-1.276 19.2-1.204 30.615.006l5.25-20.53a44.952 44.952 0 0 0-7.176-.52zm-49.455 11.103c-32.373 12.647-66.581 48.933-73.314 87.27 8.55 13.94 15.925 25.451 42.213 28.804 20.25 2.584 36.195-3.383 53.138-11.421-4.61 27.314-9.023 54.627-22.347 81.941l61.582 1.49-1.987-11.422-37.248-4.47c10.766-27.243 34.074-58.795 28.309-88.399-18.755-3.482-37.817-6.687-69.527 1.49 2.954-8.21 13.434-21.073 25.947-33.408-7.491-5.58-10.196-15.685-7.399-23.795a24.701 24.701 0 0 1 2.993-5.914c-2.137-3.465-3.52-7.4-3.807-11.752-.238-3.613.312-7.107 1.447-10.414zm-65.64 120.928c5.496 14.215 12.952 27.97 20.136 41.58-17.916-10.752-58.268-14.487-64.808-14.402-3.1 17.06-10.632 26.4-25.02 35.74l14.899 2.978 19.804-23.074c26.19 15.067 75.1 30.943 84.442 19.444.305-9.276-.076-28.955-5.8-49.584-17.281.494-32.183-4.853-43.653-12.682z',
  score: SCORES.VERY_HARD,
  obtainedCheck: ({ match }) => {
    return 2 * match.participant.stats.kills > match.team.kills && match.team.win === 'Win';
  },
  context: 'matches',
  attribute: 'capability'
};

export default carryMode;
