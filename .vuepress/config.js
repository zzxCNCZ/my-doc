module.exports = {
    title: 'Hello World',
    description: 'Hello, my friend!',
    markdown: {
        lineNumbers: true
    },
    head: [
        ['link', {
            rel: 'icon',
            href: `/banksy.ico`
        }]
    ],
    themeConfig: {
        logo: "/banksy.png",
        sidebarDepth: 2,
        lastUpdated: "Last Updated",
        nav: [
            { text: "Home", link: "/" },
            { text: "Tools", link: "/tools/" },
            { text: "Java", link: "/java/" },
            {
                text: 'Linux',
                ariaLabel: 'Linux Menu',
                link: "/linux/",
                items: [
                    { text: '文件操作',
                        items: [
                            { text: "file", link: "/linux/file/" }
                        ]
                    },
                    { text: '常规',
                        items: [
                            { text: "common", link: "/linux/common/" }
                            ]
                    },
                    { text: '系统',
                        items: [
                            { text: "system", link: "/linux/system/" }
                        ]
                    },
                    { text: 'Vim',
                        items: [
                            { text: "vim", link: "/linux/vim/" }
                            ]
                    }
                ]
            },
            { text: 'External', link: 'https://blog.zhuangzexin.top', target:'_self', rel:'' },
        ],
        sidebar: {
            "/tools/": [
                {
                    title: "Jenkins",
                    collapsable: false,
                    children: [
                        "jenkins-usage",
                        "jenkins-docker-build-image",
                        "jenkins-gitlab-auto-devops",
                        "jenkins-vue-project"
                    ].map((i) => `jenkins/${i}`),
                }
            ],
            "/java/": [
                {
                    title: "Springboot",
                    collapsable: false,
                    children: [
                        "maven"
                    ].map((i) => `springboot/${i}`),
                }
            ],
            "/linux/": [
                {
                    title: "File",
                    collapsable: false,
                    children: [
                        "common",
                        "cp",
                        "mv",
                        "tar",
                        "find",
                        "grep",
                        "tail",
                        "cat",
                        "more-less",
                        "sed"
                    ].map((i) => `file/${i}`),
                },
                {
                    title: "Common",
                    collapsable: false,
                    children: [
                        "common"
                    ].map((i) => `common/${i}`),
                },
                {
                    title: "System",
                    collapsable: false,
                    children: [
                        "network",
                        "disk",
                        "status"
                    ].map((i) => `system/${i}`),
                },
                {
                    title: "Vim",
                    collapsable: false,
                    children: [
                        "common",
                        "edit",
                        "move",
                        "search",
                        "annotation"
                    ].map((i) => `vim/${i}`),
                }
            ],
        },
    },
    ga: '',
    evergreen: true,
}
