import { AxiosResponse } from 'axios'

import { ModelsRedux } from 'types'
import { MainStateType } from './../reducers/main-reducer'

import * as constants from '../../common/constants'

export const callPostRandomPlaceMock =
    (reducerState: MainStateType) =>
    (
        success: (response: AxiosResponse<ModelsRedux.IRandomPlaceResponse | null>) => void,
        failure: (response: AxiosResponse<ModelsRedux.IServerError> | undefined) => void,
    ): void => {
        /* START - Container CampaignConstructor mock callPostRandomPlaceMock before execute code. */

        const mockData: ModelsRedux.IRandomPlaceResponse = reducerState.currentCategoryList.includes('Кафе')
            ? {
                  id: 1,
                  category: 'Cafe',
                  name: 'Mad Espresso Team',
                  description:
                      'Кофейня с завтраками напротив Юсуповского сада. В Mad Espresso Team с панорамными окнами организовали цех по выпечке хлеба и приготовлению десертов. Главной фишкой интерьера стала большая монолитная бетонная барная стойка. Как и в других кофейнях сети, здесь много живых растений. В меню завтраков уже полюбившиеся гостям сырники из рикотты, вареники с вишней, сэндвич бенедикт с лососем. Кроме того, команда регулярно экспериментируют с новыми позициями. В кофейне MET принципиально не готовят американо, вместо него предлагают фильтр-кофе и подробно рассказывают, что за зерно сегодня в работе, когда обжарено, откуда приехало.',
                  metroList: ['Садовая'],
                  address: 'пр. Римского-Корсакова 3',
                  rating: 6.3,
                  district: 'Адмиралтейский',
                  imagesList: [
                      'https://sun9-4.userapi.com/impg/9iHFzR4ZXSELnvg8KNY16sZjf6JKiGG9bagiaw/rLpgdrMplx8.jpg?size=958x639&quality=95&sign=4894f1a27dcbc5489cf2e3648640bc88&type=album',
                  ],
                  latitude: 59.924528,
                  longitude: 30.311026,
                  averageCheck: 350,
                  workingHoursList: ['Пн-Пт: 08:00 - 22:00', 'Сб: 10:00 - 22:00', 'Вс: 10:00 - 20:00'],
                  phoneNumber: '644 - 87 - 91',
                  kitchenList: ['европейская'],
              }
            : {
                  id: 2,
                  category: 'Parks',
                  name: 'Измайловский сад',
                  description:
                      'Измайловский сад был одним из первых "регулярных садов" Петербурга. С 1724 года на его месте располагалась усадьба ближайшего сподвижника Петра Великого книзя Румянцева, а при Екатерине II собственником земли и дома стал Платон Зубов. Фаворит императрицы превратил садик у дома в роскошный парк, и к началу XIX века он стал пейзажным, а не регулярным. Тогда же сад и получил свое название, поскольку рядом, на набережной Фонтанки находились казармы Измайловского гвардейского полка.',
                  metroList: ['Технологический институт - 1'],
                  address: 'наб. реки Фонтанки, д. 114',
                  rating: 9,
                  district: 'Адмиралтейский',
                  imagesList: ['https://peterburg2.ru/uploads/15/08/20/o_0_cf65e_b72fac5b_XL_0.jpg'],
                  latitude: 59.919603,
                  longitude: 30.312877,
                  averageCheck: 0,
                  workingHoursList: ['круглосуточно'],
                  phoneNumber: '',
                  kitchenList: [''],
              }

        const mockErrorData: ModelsRedux.IServerError = { message: 'По вашему запросу ничего не найдено' }
        const isMockError = false

        /* END - Container CampaignConstructor mock callPostRandomPlaceMock before execute code. */

        setTimeout(() => {
            if (isMockError === false) {
                success({ ...constants.axiosSuccessResponseMock, data: mockData })
            } else {
                failure({ ...constants.axiosSuccessFailureMock, data: mockErrorData })
            }
        }, Math.random() * 100 + 300)
    }
