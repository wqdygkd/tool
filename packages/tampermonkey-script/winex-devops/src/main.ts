// @ts-nocheck
import '@wqdy/tool-core/src/utils/GM'

if (location.pathname === '/cluster/action/index/welcome') {
  function createApp(app) {
    $(`<div class="win-cop-app"></div>`)
      .appendTo($('.win-cop-content'))
      .html(
        `
        <div class="win-cop-app-icon icon-${app.icon}"></div>
        <div class="win-cop-app-text">${app.text}</div>
    `
      )
      .on('click', function () {
        openApp(app)
      })
  }

  let timer = setInterval(() => {
    if (
      $('.win-cop-app .win-cop-app-text')
        .get()
        .find((item) => item.innerText === '制品管理')
    ) {
      clearInterval(timer)
    } else {
      createApp({
        icon: 'product-manager',
        id: '610b0a86fe99458b8766c9156392fb0d',
        no: 0,
        text: '制品管理',
        url: '/cluster/action/iframepage/initConfigPage?menuIds=610b0a86fe99458b8766c9156392fb0d'
      })
      createApp({
        icon: 'product-manager',
        id: 'bde3ccbb9ef541e18856d1288305b199',
        no: 0,
        text: '制品管理-补丁包管理',
        url: '/cluster/app/win/patchmgr'
      })
    }
  }, 1000)
}

if (location.pathname === '/cluster/app/win/webclient') {
  setInterval(() => {
    try {
      unsafeWindow.pageUI.getViewPart('main').getComponent('toolbar').getButton('toolbar_toolbaritem_web').setActive(true)
      unsafeWindow.pageUI.getViewPart('main').getComponent('toolbar').getButton('toolbar_toolbaritem_patch').setActive(true)
    } catch {}
  }, 1000)
}

if (location.pathname === '/cluster/action/iframepage/initConfigPage') {
  var navDatas = [
    {
      appType: 0,
      code: 'productManager',
      cover_sync_flag: true,
      icon: 'product-manager',
      isvisible: true,
      menuid: '610b0a86fe99458b8766c9156392fb0d',
      menuname: '制品管理',
      menupid: '2794c511326e408197a388e242e2dbdc',
      no: 50,
      subMenuList: [
        {
          appType: 2,
          cover_sync_flag: true,
          icon: 'jqbs',
          isvisible: true,
          menuid: '5140022b35474d6cafaccb1763139404',
          menuname: '项目仓库',
          menupid: '610b0a86fe99458b8766c9156392fb0d',
          menuurl: '/cluster/app/win/projectmanager',
          no: 0
        },
        {
          appType: 2,
          cover_sync_flag: true,
          icon: 'jqbs',
          isvisible: true,
          menuid: '0cbdcd65d1d74ac799b7253f917b54e1',
          menuname: '产品包管理',
          menupid: '610b0a86fe99458b8766c9156392fb0d',
          menuurl: '/cluster/app/win/products',
          no: 4
        },
        {
          appType: 2,
          cover_sync_flag: true,
          icon: 'jqbs',
          isvisible: true,
          menuid: 'bde3ccbb9ef541e18856d1288305b199',
          menuname: '补丁包管理',
          menupid: '610b0a86fe99458b8766c9156392fb0d',
          menuurl: '/cluster/app/win/patchmgr',
          no: 5
        },
        {
          appType: 2,
          cover_sync_flag: true,
          icon: 'jqbs',
          isvisible: true,
          menuid: 'bcb37aefa85f4400a0a19805b2c35aed',
          menuname: '数据库补丁',
          menupid: '610b0a86fe99458b8766c9156392fb0d',
          menuurl: '/cluster/app/win/dbpatch',
          no: 6
        },
        {
          appType: 2,
          cover_sync_flag: true,
          icon: 'productmanager',
          isvisible: false,
          menuid: 'c15f257caa034d1b8a43c47f0464e211',
          menuname: '制品管理（菜单体系的坑，这里地址要和app_config.json中的地址对应）',
          menupid: '610b0a86fe99458b8766c9156392fb0d',
          menuurl: '/cluster/action/iframepage/initConfigPage?menuIds=610b0a86fe99458b8766c9156392fb0d',
          no: 7
        },
        {
          appType: 2,
          cover_sync_flag: true,
          icon: 'jqbs',
          isvisible: true,
          menuid: '9b051274e41844fcbdc3e5dc786782cc',
          menuname: '产品发布历史',
          menupid: '610b0a86fe99458b8766c9156392fb0d',
          menuurl: '/cluster/app/win/pubhistory',
          no: 10
        },
        {
          appType: 2,
          cover_sync_flag: true,
          icon: 'jqbs',
          isvisible: true,
          menuid: 'fddc4e9e88df458cb5f01f7e2ae617da',
          menuname: '发布计划管理',
          menupid: '610b0a86fe99458b8766c9156392fb0d',
          menuurl: '/cluster/app/win/releaseplan',
          no: 11
        }
      ],
      tags: '制品管理',
      title: '制品'
    }
  ]

  let timer = setInterval(() => {
    if (!$('#nav_bde3ccbb9ef541e18856d1288305b199')[0]) {
      try {
        var expandNav = null
        var l1Length = navDatas.length
        var subNavMaxHeight = $('.cluster-nav').innerHeight() - 48 * l1Length
        $.activeTab = []
        function refreshNav() {
          $('.nav').empty()
          for (var i = 0; i < l1Length; i++) {
            var l1_id = navDatas[i].menuid,
              l1_name = navDatas[i].menuname,
              l1_visible = navDatas[i].isvisible,
              ll_icon = navDatas[i].icon
            if (l1_visible) {
              // 创建一级菜单
              var l1 = $('<li></li>').appendTo('.nav')
              // 添加a标签
              var l1_a = $("<a href='javascript:void(0);'></a>")
                .appendTo(l1)
                .data('navData', navDatas[i])
                .on({
                  click: function () {
                    // 一级导航单击
                    $('#nav_collapse').triggerHandler('click')
                    var _ul = $(this).parent().children('.sub-wrap')
                    if (expandNav && expandNav[0] != _ul[0]) {
                      expandNav.hide()
                    }
                    expandNav = _ul
                    var that = this
                    _ul.slideToggle(function () {
                      $('.nav').find('a').removeClass('l1nav-select')
                      $('.nav').find('.level1-tag').removeClass('level1-tag-select')
                      if ($(this).is(':visible')) {
                        $(that).addClass('l1nav-select')
                        $(that).find('.level1-tag').addClass('level1-tag-select')
                      }
                    })
                  },
                  mouseover: function (e) {
                    //								navHover.call(this, e);
                  },
                  mouseout: function () {
                    //								$(".nav-tip").hide();
                  }
                })
              // 添加图标
              $("<div class='l1icon liicon-" + ll_icon + "'></div>").appendTo(l1_a)
              // 菜单名
              $("<div class='nav-text'></div>").appendTo(l1_a).html(l1_name)
              $("<div class='level1-tag'></div>").appendTo(l1_a)

              // 创建二级菜单
              var l2_wrap = $("<div class='sub-wrap'></div>")
                .appendTo(l1)
                .css('max-height', subNavMaxHeight + 'px')
                .hide()
              var l2_ul = $("<ul class='sub-ul'></ul>")
                .appendTo(l2_wrap)
                .css('max-height', subNavMaxHeight + 'px')

              // 获取二级菜单数据
              var subNavDatas = navDatas[i].subMenuList
              // 为空则不进行处理
              if (subNavDatas == undefined || subNavDatas == null) {
                continue
              }

              for (var j = 0; j < subNavDatas.length; j++) {
                var l2_id = subNavDatas[j].menuid,
                  l2_name = subNavDatas[j].menuname,
                  l2_visible = subNavDatas[j].isvisible,
                  l2_icon = subNavDatas[j].icon
                if (l2_visible) {
                  var l2 = $("<li id='nav_" + subNavDatas[j].menuid + "'></li>").appendTo(l2_ul)
                  var l2_a = $("<a href='javascript:void(0);'></a>").appendTo(l2).data('navData', subNavDatas[j])
                  $("<div class='nav-icon nav-icon-" + l2_icon + "'></div>").appendTo(l2_a)
                  $("<div class='nav-text'></div>").appendTo(l2_a).html(l2_name)
                  l2_a.on({
                    click: function () {
                      //二级导航单击
                      $('.nav').find('li>a').removeClass('nav-select')
                      $(this).addClass('nav-select')
                      var _navData = $(this).data('navData')
                      $('.cluster-tab').children().removeClass('tab-select')
                      $('.content').css('visibility', 'hidden')
                      if ($.activeTab.indexOf(_navData.menuid) < 0) {
                        var tabwrap = $("<div id='tab_" + _navData.menuid + "' class='tab tab-select'>")
                          .data('navData', _navData)
                          .appendTo($('.cluster-tab'))
                          .on('click', function () {
                            //tab页签单击事件
                            $('.nav').find('li>a').removeClass('nav-select')
                            var _menuId = $(this).data('navData').menuid
                            $('#nav_' + _menuId)
                              .children('a')
                              .addClass('nav-select')
                            var divWrap = $('#nav_' + _menuId)
                              .parent()
                              .parent()
                            if (!divWrap.is(':visible')) {
                              divWrap.prev('a').triggerHandler('click')
                            }

                            $('.cluster-tab').children().removeClass('tab-select')
                            $('.content').css('visibility', 'hidden')
                            $(this).addClass('tab-select')
                            $('#content_' + _navData.menuid).css('visibility', 'visible')
                          })
                        $("<div class='tabtext'>" + _navData.menuname + '</div>').appendTo(tabwrap)
                        $("<div class='tabclose'>×</div>")
                          .appendTo(tabwrap)
                          .data('tabId', _navData.menuid)
                          .on('click', function (e) {
                            //tab页签关闭事件
                            var tabId = $(this).data('tabId')
                            $('#tab_' + tabId).remove()
                            $('#content_' + tabId).remove()
                            var tabIndex = $.activeTab.indexOf(tabId)
                            $.activeTab.splice(tabIndex, 1)
                            var tabWrap = $('.cluster-tab')
                            if (tabWrap.find('.tab-select').length == 0 && tabWrap.children().length > 0) {
                              var selectIndex = tabIndex - 1
                              if (selectIndex < 0) {
                                selectIndex = 0
                              }
                              $('.cluster-tab').children().eq(selectIndex).addClass('tab-select')
                              $('.cluster-center')
                                .children()
                                .eq(selectIndex + 1)
                                .css('visibility', 'visible')
                            }
                            e.stopPropagation()
                          })

                        $(
                          "<div id='content_" +
                            _navData.menuid +
                            "' class='content'><iframe id='appiframe' name='appiframe' src='" +
                            _navData.menuurl +
                            "' width='100%' height='100%' scrolling='no' frameborder='0'></iframe></div>"
                        ).appendTo('.cluster-center')
                        $.activeTab.push(_navData.menuid)
                      } else {
                        $('#tab_' + _navData.menuid).addClass('tab-select')
                        $('#content_' + _navData.menuid).css('visibility', 'visible')
                      }
                    }
                  })
                }
              }
            }
          }
        }
        refreshNav()
      } catch {}
    } else {
      clearInterval(timer)
    }
  }, 1000)
}
