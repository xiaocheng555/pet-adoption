
import {
  ageOptions,
  petGenderOptions,
  petSterilizationOptions,
  petVaccinationOptions,
  petFreeOptions
} from '@/library/constant'
import { dateFormat } from './date'
import { getImgUrlByKey } from '@/library/utils'

/*
 * 适配领养列表
*/
function adapterFeedList(list) {
  return list.map(item => {
    let {
      uuid,
      created,
      pet_name,
      pet_sex,
      pet_classid,
      pet_sterilization,
      pet_vaccine,
      pet_age,
      pet_state,
      free,
      pet_images,
      locality_name,
      pet_variety,
      adoption_request,
      pet_disposition
    } = item
    return {
      id: uuid,
      date: dateFormat(created, 'YYYY-MM-DD HH:mm'),
      name: 'Zhang°先森',
      avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIBNWMbATA1z48yPkpaf9W8qOfCf3FicZaVHU0xGaulOQfnDOBRJCwLazo5Ue5GPPicnQgcSmQgKfsQ/132',
      petName: pet_name,
      // 宠物类型id
      petClassId: pet_classid,
      petAge: getOptionsLabel(ageOptions, pet_age),
      // 是否免费
      petFree: getOptionText(petFreeOptions, free),
      // 是否绝育
      petSterilization: getOptionText(petSterilizationOptions, pet_sterilization),
      petSex: getOptionsLabel(petGenderOptions, pet_sex),
      // 是否注射疫苗
      petVaccine: getOptionText(petVaccinationOptions, pet_vaccine),
      petImages: (pet_images || []).map(key => {
        return getImgUrlByKey(key)
      }),
      address: locality_name,
      // 宠物种类
      petVariety: pet_variety,
      // 宠物领养需求
      adoptionRequest: adoption_request,
      // 宠物描述
      petDesc: pet_disposition,
      // 宠物状态（1进行中，2完成，3取消）
      petState: pet_state
    }
  })
}

/*
 * 根据value值，获取选项中的label值
*/

function getOptionsLabel(options, value) {
  let label = null
  options.some(item => {
    if (item.value === value) {
      label = item.label
      return true
    }
  })
  return label
}

/*
 * 根据value值，获取选项中的text值
*/
function getOptionText(options, value) {
  let text = null
  options.some(item => {
    if (item.value === value) {
      text = item.text
      return true
    }
  })
  return text
}

export {
  adapterFeedList,
  getOptionsLabel
}
