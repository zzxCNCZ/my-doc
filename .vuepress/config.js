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
        logo: '/banksy.png',
        sidebarDepth: 2,
        search: true,
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'Home', link: '/' },
            {
                text: 'Tools',
                link: '/tools/',
                ariaLabel: 'Tools',
                items: [
                    { text: '持续集成',
                        items: [
                            { text: 'Jenkins', link: '/tools/jenkins/' }
                        ]
                    },
                    { text: 'Docker',
                        items: [
                            { text: 'Docker', link: '/tools/docker/'},
                            { text: 'docker-compose', link: '/tools/docker-compose/'},
                            { text: 'Dockerfile', link: '/tools/Dockerfile/'}
                        ]
                    },
                    { text: '版本控制',
                        items: [
                            { text: 'Git', link: '/tools/git/' }
                        ]
                    },
                    { text: 'K8s',
                        items: [
                            { text: 'K8s', link: '/tools/K8s/' }
                        ]
                    },
                    { text: '其他',
                        items: [
                            { text: 'Nginx', link: '/tools/nginx/' },
                            { text: 'Kafka', link: '/tools/kafka/' },
                            { text: 'Wireguard', link: '/tools/wireguard/wireguard' }
                        ]
                    }
                ]
            },
            { text: 'Java', link: '/java/' },
            { text: 'Sql', link: '/sql/',
                items: [
                    { text: 'mysql',
                        items: [
                            { text: '语法', link: '/sql/mysql/grammar/' },
                            { text: '安装及配置', link: '/sql/mysql/install-setting/' },
                            { text: '常用', link: '/sql/mysql/common/' },
                        ]
                    }
                ]
            },
            { text: 'JavaScript', link: '/javascript/',
                items: [
                    { text: '基础',
                        items: [
                            { text: '常用语法', link: '/javascript/common/' },
                            { text: 'ES6', link: '/javascript/es6/' },
                            { text: 'nodejs', link: '/javascript/nodejs/nodejs' }
                        ]
                    }
                ]
            },
            { text: 'CSS', link: '/css/',
                items: [
                    { text: '常用布局',
                        items: [
                            { text: 'flex', link: '/css/flex' },
                            { text: 'grid', link: '/css/grid' }
                        ]
                    },
                    { text: '常用语法',
                        items: [
                            { text: 'common', link: '/css/common' },
                            { text: 'animation', link: '/css/animation' }
                        ]
                    }
                ]
            },
            { text: 'SP', link: '/sp/',
                items: [
                    { text: 'Python',
                        items: [
                            { text: '基础', link: '/sp/python/basic' }
                        ]
                    }
                ] },
            {
                text: 'Linux',
                ariaLabel: 'Linux Menu',
                link: '/linux/',
                items: [
                    { text: '文件操作',
                        items: [
                            { text: 'file', link: '/linux/file/' }
                        ]
                    },
                    { text: '常规',
                        items: [
                            { text: 'common', link: '/linux/common/' }
                            ]
                    },
                    { text: '系统',
                        items: [
                            { text: 'system', link: '/linux/system/' }
                        ]
                    },
                    { text: 'Vim',
                        items: [
                            { text: 'vim', link: '/linux/vim/' }
                            ]
                    }
                ]
            },
            { text: 'Blog', link: 'https://blog.zhuangzexin.top', target:'_self', rel:'' },
        ],
        sidebar: {
            '/tools/': [
                {
                    title: 'Jenkins',
                    collapsable: false,
                    children: [
                        'jenkins-usage',
                        'jenkins-docker-build-image',
                        'jenkins-gitlab-auto-devops',
                        'jenkins-vue-project'
                    ].map((i) => `jenkins/${i}`),
                },
                {
                    title: 'docker',
                    collapsable: false,
                    children: [
                        'install-setting',
                        'command',
                        'network',
                        'other',
                        'example'
                    ].map((i) => `docker/${i}`),
                },
                {
                    title: 'Dockerfile',
                    collapsable: false,
                    children: [
                        'command'
                    ].map((i) => `Dockerfile/${i}`),
                },
                {
                    title: 'docker-compose',
                    collapsable: false,
                    children: [
                        'usage',
                        'common',
                        'example',
                        'reference'
                    ].map((i) => `docker-compose/${i}`),
                },
                {
                    title: 'Git',
                    collapsable: false,
                    children: [
                        'common',
                        'branch',
                        'tag'
                    ].map((i) => `git/${i}`),
                },
                {
                    title: 'Nginx',
                    collapsable: false,
                    children: [
                        'common',
                        'setting',
                        'proxy_pass',
                        'problem'
                    ].map((i) => `nginx/${i}`),
                },
                {
                    title: 'K8s',
                    collapsable: false,
                    children: [
                        'basis'
                    ].map((i) => `K8s/${i}`),
                },
                {
                    title: 'kafka',
                    collapsable: false,
                    children: [
                        'setting',
                        'usage'
                    ].map((i) => `kafka/${i}`),
                },
            ],
            '/java/': [
                {
                    title: 'Springboot',
                    collapsable: false,
                    children: [
                        'maven'
                    ].map((i) => `springboot/${i}`),
                }
            ],
            '/sql/': [
                {
                    title: 'Mysql',
                    collapsable: false,
                    children: [
                        'grammar',
                        'install-setting',
                        'common',
                    ].map((i) => `mysql/${i}`),
                }
            ],
            '/javascript/': [
                {
                    title: '基础',
                    collapsable: false,
                    children: [
                        'common',
                        'date',
                        'array',
                        'prototype'
                    ].map((i) => `common/${i}`),
                },
                {
                    title: 'ES6(ECMAScript 2015)',
                    collapsable: false,
                    children: [
                        'pro',
                        'optional-chain'
                    ].map((i) => `es6/${i}`),
                },
                {
                    title: 'nodejs&npm&yarn',
                    collapsable: false,
                    children: [
                        'nodejs',
                        'npm',
                        'yarn'
                    ].map((i) => `nodejs/${i}`),
                }
             ],
            '/css/': [
                {
                    title: '布局',
                    collapsable: false,
                    children: [
                        'flex',
                        'grid'
                    ],
                },
                {
                    title: '常用语法',
                    collapsable: false,
                    children: [
                        'common',
                        'animation'
                    ]
                }
            ],
            '/linux/': [
                {
                    title: 'File',
                    collapsable: false,
                    children: [
                        'common',
                        'cp',
                        'mv',
                        'ln',
                        'find',
                        'grep',
                        'tar-zip',
                        'tail',
                        'cat',
                        'more-less',
                        'sed',
                        'tree',
                        'wget'
                    ].map((i) => `file/${i}`),
                },
                {
                    title: 'Common',
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        'common',
                        'nohup',
                        'process',
                        'task'
                    ].map((i) => `common/${i}`),
                },
                {
                    title: 'System',
                    collapsable: false,
                    children: [
                        'network',
                        'disk',
                        'status',
                        'swap'
                    ].map((i) => `system/${i}`),
                },
                {
                    title: 'Vim',
                    collapsable: false,
                    children: [
                        'common',
                        'edit',
                        'move',
                        'search',
                        'annotation'
                    ].map((i) => `vim/${i}`),
                }
            ],
            '/sp/python/': [
                {
                    title: 'Python',
                    collapsable: false,
                    children: [
                        'basic'
                    ],
                }
            ],
        },
    },
    ga: '',
    evergreen: true,
}
