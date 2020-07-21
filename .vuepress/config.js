module.exports = {
    title: 'Hello World',
    description: 'Hello, my friend!',
    head: [
        ['link', {
            rel: 'icon',
            href: `/favicon.ico`
        }]
    ],
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Tools", link: "/tools/" },
            { text: "Java", link: "/java/" }
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
            ]
        },
    },
    ga: '',
    evergreen: true,
}
