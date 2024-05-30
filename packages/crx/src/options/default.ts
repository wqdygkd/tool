// 医保卡
export const medicareCard = [
  {
    json: {
      success: true,
      errorDetail: {
        code: '1',
        message: '',
        original: {
          code: '1',
          message: '',
          ipAddress: '192.150.32.43'
        }
      },
      data: {
        identityTypeCode: '152691',
        identityNo: '3600002300000000100051943',
        patientCardCheckBit: '',
        otherReadCardInfo: {
          fromHospital: '',
          personType: '',
          isInRedList: '',
          isInHospitalFlag: '',
          chronicCode: '',
          isChronicHospital: '',
          militaryDisabledLevel: '',
          isSpecifiedHospital: '',
          isWithholdingFlag: '',
          isInjury: '',
          isNation: '',
          fundtype: '',
          isCivil: '',
          exServiceFlag: '',
          areaCode: '',
          personCount: ''
        },
        accountInformationList: [],
        entityCertificateInfomationList: [],
        identityCertificateInfomationList: [
          {
            identityCertificateTypeConceptId: '253818',
            identityCertificateTypeCode: '152626',
            identityCertificateNo: '362301194709061041'
          },
          {
            identityCertificateTypeConceptId: '399202505',
            identityCertificateTypeCode: '152691',
            identityCertificateNo: '3600002300000000100051943'
          }
        ],
        chronicIdiopathy: [],
        Insuinfo: [
          {
            balc: '0.00',
            insutype: '310',
            psnType: '1201',
            psnInsuStas: null,
            psnInsuDate: null,
            pausInsuDate: null,
            cvlservFlag: '0',
            insuplcAdmdvs: '361199',
            empName: '改制企业退休人员（2019合并后）',
            crtYearBalc: '0',
            calYearBalc: '0'
          }
        ],
        personInfomation: {
          name: '颜菊花',
          sexConceptId: '253817',
          nationConceptId: '',
          nationalityConceptId: 399_205_791,
          maritalStatusConceptId: '',
          birthday: '1947-09-06',
          telphone: '',
          photo: '',
          photoURL: '',
          detailedAddress: '',
          defaultMedicalInsuranceCodeConceptId: 399_202_211,
          fromHospitalDate: null,
          psnNo: '3600002300000000100051943',
          mdtrtCertType: '03',
          mdtrtCertNo: '474163442',
          expiTime: '',
          baseinfo: {
            age: '76',
            brdy: '1947-09-06',
            certno: '362301194709061041',
            expContent: {
              crtYearBalc: null,
              calYearBalc: null,
              expiTime: null
            },
            gend: '2',
            naty: null,
            psnCertType: '90',
            psnName: '颜菊花',
            psnNo: '3600002300000000100051943'
          }
        }
      }
    }
  }
]

// 身份证
export const identityCard = [{}]
