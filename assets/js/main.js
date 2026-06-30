// Add your javascript here

window.darkMode = false;

const stickyClasses = ['fixed', 'h-14'];
const unstickyClasses = ['absolute', 'h-20'];
const stickyClassesContainer = ['border-neutral-300/50' , 'bg-white/80', 'dark:border-neutral-600/40', 'dark:bg-neutral-900/60', 'backdrop-blur-2xl'];
const unstickyClassesContainer = ['border-transparent'];
let headerElement = null;

window.siteLanguage = 'en';

const translations = {
    en: {
        'nav.home': 'Home',
        'nav.recruitment': 'Recruitment',
        'nav.publish': 'Publish',
        'nav.team': 'Team',
        'nav.about': 'About',
        'theme.day': 'Day mode',
        'theme.night': 'Night mode',
        'language.toggleToChinese': 'Switch language to Chinese',
        'language.toggleToEnglish': 'Switch language to English',
        'language.current': 'EN',
        'page.home.title': 'YangLi Lab - Your Dream Lab',
        'page.about.title': 'About Me',
        'page.recruitment.title': 'Recruitment',
        'page.publish.title': 'Publish',
        'page.team.title': 'Team',
        'page.posts.title': 'My Writing',
        'home.title': 'Hi~ Welcome to YangLi Lab.',
        'home.intro': '<span class="font-semibold">YangLi Lab</span>, led by Dr. Yang Li, develops AI for medical image analysis and computer-aided diagnosis.',
        'home.research.medicalImage': 'Medical Image Processing and Analysis',
        'home.research.aiForScience': 'Artificial Intelligence for Science',
        'home.research.diagnosis': 'Computer-aided Diagnosis',
        'home.research.deepLearning': 'Deep Learning',
        'home.research.more': 'Other more areas ....',
        'home.values': 'Our Values can be found here.',
        'about.heading': 'About Yang Li',
        'about.description': 'Hello 👋 Here is some detailed introduction about Dr. Yang Li',
        'about.introduction.title': 'Introduction',
        'about.introduction.body': 'Yang Li, Ph.D. of Engineering in Pattern Recognition and Intelligent Systems at the University of the Chinese Academy of Sciences, is an Associate Professor and Master\'s Supervisor at the School of Computer Science and Technology (School of Artificial Intelligence), Zhejiang Sci-Tech University, and a Senior Member of the Chinese Society of Biomedical Engineering.<br>Currently, he presides over one National Natural Science Foundation of China (NSFC) Youth Fund project, one Zhejiang Province Basic Public Welfare Research Plan project, and one sub-project of the Ningxia Hui Autonomous Region Key R&D Plan, and participates in one National Key R&D Program, two National Natural Science Foundation projects, and one Zhejiang Province Key R&D Plan project. He has published over 20 SCI/EI papers and co-authored one academic monograph.',
        'about.funds': 'Funds',
        'recruitment.heading': 'Join US',
        'recruitment.description': 'Welcome to our recruitment page. Here is a brief introduction to our laboratory, including laboratory equipments and benefits.',
        'recruitment.devices.title': '🖥️ Devices',
        'recruitment.devices.description': 'Our lab\'s servers are equipped with <span class="font-semibold">5 RTX 4090 GPUs</span> and <span class="font-semibold">128GB of RAM</span>, providing each student with an individual account, supporting SSH remote connections, high concurrency, and high responsiveness to meet the research and experimental needs of <span class="font-semibold">every student</span>.',
        'recruitment.requirements.title': '🛠️ Requirements',
        'recruitment.requirements.description': 'If you are interested in the following topics and are passionate about learning medical AI knowledge, please prepare your <span class="font-semibold">Personal Materials</span>.<br> The materials are included but not limited to your <span class="font-semibold">Resume</span>, <span class="font-semibold">Award Certificates</span>, and <span class="font-semibold">Research Experience</span>, as evidence of your comprehensive abilities. <br><br>Our research topics are as following:<ul class="py-2 space-y-[3px] text-sm list-disc list-inside text-neutral-500 dark:text-neutral-400"><li>Medical Image Segmentation, Detection, and Registration</li><li>Early Alzheimer\'s Disease Computer-aided Diagnosis</li><li>Cross-modal and Multimodal Medical Image Analysis</li><li>ECG Classification and Computer-aided Diagnosis</li><li>Federated Learning for Medical AI</li></ul>',
        'recruitment.contact.title': '📮 Contact',
        'recruitment.contact.description': 'If meeting our requirements, and you are willing to join us. Please prepare your personal materials and contact our tutor YangLi via email. The mail is <span class="font-semibold">yangli@zstu.edu.cn</span>',
        'publish.heading': 'Published Papers',
        'publish.description': '',
        'team.heading': 'Team Memberships',
        'team.description': '',
        'team.professors': 'Professors',
        'team.currentStudents': 'Current Students',
        'team.graduatedStudents': 'Graduated Students',
        'team.instructor': 'Instructor',
        'team.students': 'Students',
        'posts.heading': 'My Writing',
        'posts.description': 'Dive into my musings on life and tech in my latest posts; a blend of introspection and innovation. Keep an eye out for fresh insights and updates!',
        'footer.tagline': '© 2026 YangLi Lab - Your Dream Lab',
        'profile.name': 'Yang Li',
        'profile.role': 'Assistant Professor',
        'profile.button': 'Profile',
        'profile.degree': 'Ph.D. at UCAS (SHEN YANG)',
        'profile.membership': 'Senoir Member of CSBME',
        'profile.research': 'Pattern Recognition',
        'context.copyEmail': 'Copy email',
        'context.visitHomepage': 'Visit homepage',
        'team.instructors.mingfengJiang.name': 'Mingfeng Jiang',
        'team.instructors.mingfengJiang.description': 'Leader & Medical Image Processing',
        'team.instructors.yangLi.name': 'Yang Li',
        'team.instructors.yangLi.description': 'Pattern Recognition & Medical AI',
        'team.currentStudents.jiaqiHu.name': 'JiaQi Hu',
        'team.currentStudents.jiaqiHu.description': 'Medical image segmentation based on diffusion models',
        'team.currentStudents.zilongFan.name': 'ZiLong Fan',
        'team.currentStudents.zilongFan.description': 'Semi-supervised medical image segmentation',
        'team.currentStudents.junyiZhang.name': 'JunYi Zhang',
        'team.currentStudents.junyiZhang.description': 'Federated Parameter-Efficient Fine-Tuning',
        'team.currentStudents.minghaoJin.name': 'MingHao Jin',
        'team.currentStudents.minghaoJin.description': 'Flow Matching-based cross-modal medical image synthesis',
        'team.currentStudents.lingyunHong.name': 'LingYun Hong',
        'team.currentStudents.lingyunHong.description': 'Federated Learning & ECG Classification',
        'team.currentStudents.jinkeWang.name': 'JinKe Wang',
        'team.currentStudents.jinkeWang.description': 'Cardiac Ultrasound Image Segmentation',
        'team.students.xinmiaoZhu.name': 'Xinmiao Zhu',
        'team.students.xinmiaoZhu.description': 'Cross-modal Spine Generation',
        'team.students.fangtaoSong.name': 'Fangtao Song',
        'team.students.fangtaoSong.description': 'Federated Learning & Swarm Learning',
        'team.students.chenmiaoRuan.name': 'Chenmiao Ruan',
        'team.students.chenmiaoRuan.description': 'Image Registration',
        'team.students.longWei.name': 'Long Wei',
        'team.students.longWei.description': 'ECG Classification',
        'team.students.yongjieLiu.name': 'Yongjie Liu',
        'team.students.yongjieLiu.description': 'Lung Nodule Detection & Segementation',
        'publications.dyscorediff.authors': 'Jiaqi Hu, Yang Li',
        'publications.ecgCnnTransformer.authors': 'Long Wei, Yang Li',
        'publications.lmrt.authors': 'Xinmiao Zhu, Yang Li',
        'publications.hsgo.authors': 'Fangtao Song, Yang Li, Mingfeng Jiang, Kaicheng Li, Jucheng Zhang, Yinlong Zhang, Zhibo Pang',
        'publications.socrYolo.authors': 'Yongjie Liu, Yang Li, Mingfeng Jiang, Shuchao Wang, Shitai Ye, Simon Walsh, Guang Yang'
    },
    zh: {
        'nav.home': '首页',
        'nav.recruitment': '招生',
        'nav.publish': '发表论文',
        'nav.team': '团队',
        'nav.about': '关于',
        'theme.day': '日间模式',
        'theme.night': '夜间模式',
        'language.toggleToChinese': '切换到中文',
        'language.toggleToEnglish': '切换到英文',
        'language.current': '中文',
        'page.home.title': 'YangLi Lab - Your Dream Lab',
        'page.about.title': '个人介绍',
        'page.recruitment.title': '招生',
        'page.publish.title': '发表论文',
        'page.team.title': '团队',
        'page.posts.title': '文章',
        'home.title': 'Hi~ 欢迎来到 YangLi Lab。',
        'home.intro': '<span class="font-semibold">YangLi Lab</span> 由李杨老师负责，聚焦医学图像分析与计算机辅助诊断方向的人工智能研究。',
        'home.research.medicalImage': '医学图像处理与分析',
        'home.research.aiForScience': '科学智能',
        'home.research.diagnosis': '计算机辅助诊断',
        'home.research.deepLearning': '深度学习',
        'home.research.more': '更多研究方向 ....',
        'home.values': '从这里了解我们的团队的价值观～',
        'about.heading': '个人介绍',
        'about.description': '你好 👋 这里是李杨老师的详细介绍。',
        'about.introduction.title': '个人简介',
        'about.introduction.body': '<p>李杨，中国科学院大学模式识别与智能系统专业工学博士，现为浙江理工大学计算机科学与技术学院（人工智能学院）副教授、硕士生导师，中国生物医学工程学会高级会员。</p><p>目前主持国家自然科学基金青年项目、浙江省基础公益研究计划项目、宁夏回族自治区重点研发计划子课题各1项，并参与国家重点研发计划项目1项、国家自然科学基金项目2项、浙江省重点研发计划项目1项。已发表 SCI/EI 论文20余篇，合著学术专著1部。</p>',
        'about.funds': '科研项目',
        'recruitment.heading': '加入我们',
        'recruitment.description': '欢迎查看招生页面。这里简要介绍实验室设备、研究方向和联系方式。',
        'recruitment.devices.title': '🖥️ 设备',
        'recruitment.devices.description': '实验室服务器配备 <span class="font-semibold">5 张 RTX 4090 GPU</span> 和 <span class="font-semibold">128GB 内存</span>，为每位同学提供独立账号，支持 SSH 远程连接、高并发和快速响应，满足 <span class="font-semibold">每位同学</span> 的科研实验需求。',
        'recruitment.requirements.title': '🛠️ 要求',
        'recruitment.requirements.description': '如果你对以下方向感兴趣，并愿意学习医学人工智能知识，请准备好 <span class="font-semibold">个人材料</span>。材料包括但不限于 <span class="font-semibold">简历</span>、<span class="font-semibold">获奖证书</span> 和 <span class="font-semibold">科研经历</span>，用于展示综合能力。<br><br>我们的研究方向包括：<ul class="py-2 space-y-[3px] text-sm list-disc list-inside text-neutral-500 dark:text-neutral-400"><li>医学图像分割、检测与配准</li><li>早期阿尔兹海默症计算机辅助诊断</li><li>跨模态与多模态医学图像分析</li><li>心电分类与计算机辅助诊断</li><li>面向医学人工智能的联邦学习</li></ul>',
        'recruitment.contact.title': '📮 联系方式',
        'recruitment.contact.description': '如果你符合要求并愿意加入我们，请准备个人材料，并通过邮件联系导师李杨。邮箱为 <span class="font-semibold">yangli@zstu.edu.cn</span>。',
        'publish.heading': '发表论文',
        'publish.description': '',
        'team.heading': '团队成员',
        'team.description': '',
        'team.professors': '教师',
        'team.currentStudents': '在读学生',
        'team.graduatedStudents': '已毕业学生',
        'team.instructor': '导师',
        'team.students': '学生',
        'posts.heading': '文章',
        'posts.description': '阅读近期文章，了解生活与技术方面的思考、实践和更新。',
        'footer.tagline': '© 2026 YangLi Lab - Your Dream Lab',
        'profile.name': '李杨',
        'profile.role': '副教授',
        'profile.button': '主页',
        'profile.degree': '中国科学院大学博士（沈阳）',
        'profile.membership': '中国生物医学工程学会高级会员',
        'profile.research': '模式识别',
        'context.copyEmail': '复制邮箱',
        'context.visitHomepage': '访问主页',
        'funds.roles.principalInvestigator': '主持',
        'funds.roles.participant': '参与',
        'funds.agencies.zhejiangNaturalScience': '浙江省自然科学基金委',
        'funds.agencies.unspecified': '暂未指明基金出处',
        'funds.agencies.ningxiaScienceTechnology': '宁夏回族自治区科学技术厅',
        'funds.agencies.nsfc': '国家自然科学基金委',
        'funds.agencies.horizontal': '横向',
        'funds.agencies.zstu': '浙江理工大学',
        'funds.agencies.zhejiangScienceTechnology': '浙江省科技厅',
        'funds.agencies.most': '国家科技部',
        'funds.preciseCmvdDiagnosis.title': '基于智能负荷心肌声学造影技术的冠状动脉微血管疾病精准诊断方法与可解释性研究',
        'funds.macePrediction.title': '基于数据增强与多模态多中心群体学习的重大心血管事件智能预测研究',
        'funds.arrhythmiaMonitoring.title': '基于柔性可穿戴心电大数据智能分析的心律失常预警监测技术研发与示范应用',
        'funds.lumbarRegistration.title': '基于语义约束微分同胚映射的术中大形变腰椎图像配准方法研究',
        'funds.alzheimersTransferLearning.title': '基于跨模态图像迁移学习的早期阿尔兹海默症诊断方法研究',
        'funds.smartConstruction.title': '智慧工地一体化解决方案',
        'funds.spinalSurgeryNavigation.title': '面向微创脊柱手术导航的多模态医学图像配准方法研究',
        'funds.afRecurrencePrediction.title': '面向房颤复发预测的心脏磁共振影像智能处理与分析方法研究',
        'funds.fastHighResolutionMri.title': '快速高分辨率磁共振成像及其脑类淋巴系统中的应用',
        'funds.smartMedicalDevices.title': '智慧医疗设备与系统研发-基于可解释性卷积循环神经网络的心律失常智能监测平台研究',
        'funds.malignantArrhythmiaWarning.title': '基于柔性可穿戴心电大数据智能分析的恶性心律失常猝死预警关键技术与应用研究',
        'funds.speechTranscriptionUnderstandability.title': '人人交互的语音识别转写可懂度评价方法研究',
        'funds.futureMetaCommunity.title': '面向未来元社区的快速建模与智能虚实交互关键技术研究与应用示范',
        'funds.cherenkovRadiotherapy.title': '基于高灵敏多光谱Cherenkov成像的放射治疗多模态图像引导关键技术研究',
        'team.instructors.mingfengJiang.name': '蒋明峰',
        'team.instructors.mingfengJiang.description': '医学图像处理与分析',
        'team.instructors.yangLi.name': '李杨',
        'team.instructors.yangLi.description': '模式识别与医学人工智能',
        'team.currentStudents.jiaqiHu.name': '胡佳奇',
        'team.currentStudents.jiaqiHu.description': '基于扩散模型的医学图像分割',
        'team.currentStudents.zilongFan.name': '范紫龙',
        'team.currentStudents.zilongFan.description': '半监督医学图像分割',
        'team.currentStudents.junyiZhang.name': '张骏益',
        'team.currentStudents.junyiZhang.description': '联邦参数高效微调',
        'team.currentStudents.minghaoJin.name': '金明浩',
        'team.currentStudents.minghaoJin.description': '基于流匹配的跨模态医学图像合成',
        'team.currentStudents.lingyunHong.name': '洪凌云',
        'team.currentStudents.lingyunHong.description': '联邦学习与心电信号分类',
        'team.currentStudents.jinkeWang.name': '王金科',
        'team.currentStudents.jinkeWang.description': '心脏超声图像分割',
        'team.students.xinmiaoZhu.name': '朱鑫淼',
        'team.students.xinmiaoZhu.description': '跨模态脊柱影像生成',
        'team.students.fangtaoSong.name': '宋方涛',
        'team.students.fangtaoSong.description': '联邦学习与群体学习',
        'team.students.chenmiaoRuan.name': '阮晨淼',
        'team.students.chenmiaoRuan.description': '图像配准',
        'team.students.longWei.name': '韦龙',
        'team.students.longWei.description': '心电信号分类',
        'team.students.yongjieLiu.name': '刘永杰',
        'team.students.yongjieLiu.description': '肺结节检测与分割',
        'publications.dyscorediff.authors': '胡佳奇, 李杨',
        'publications.ecgCnnTransformer.authors': '韦龙, 李杨',
        'publications.lmrt.authors': '朱鑫淼, 李杨',
        'publications.hsgo.authors': '宋方涛, 李杨, 蒋明峰, Kaicheng Li, Jucheng Zhang, Yinlong Zhang, Zhibo Pang',
        'publications.socrYolo.authors': '刘永杰, 李杨, 蒋明峰, Shuchao Wang, Shitai Ye, Simon Walsh, Guang Yang'
    }
};

function normalizeLanguage(language){
    return language == 'zh' ? 'zh' : 'en';
}

function getStoredValue(key){
    try {
        return localStorage.getItem(key);
    } catch (error) {
        return null;
    }
}

function getStoredLanguage(){
    try {
        const storedLanguage = localStorage.getItem('site_language');
        return normalizeLanguage(storedLanguage);
    } catch (error) {
        return 'en';
    }
}

function setStoredLanguage(language){
    const normalizedLanguage = normalizeLanguage(language);
    try {
        localStorage.setItem('site_language', normalizedLanguage);
    } catch (error) {
        window.siteLanguage = normalizedLanguage;
    }
}

function getTranslation(key, language){
    const selectedLanguage = normalizeLanguage(language || window.siteLanguage);
    return translations[selectedLanguage][key] || translations.en[key] || null;
}

function applyLanguage(language){
    const selectedLanguage = normalizeLanguage(language);
    window.siteLanguage = selectedLanguage;
    document.documentElement.lang = selectedLanguage == 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function(element){
        const translatedText = getTranslation(element.dataset.i18n, selectedLanguage);
        if(translatedText !== null){
            element.textContent = translatedText;
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function(element){
        const translatedHtml = getTranslation(element.dataset.i18nHtml, selectedLanguage);
        if(translatedHtml !== null){
            element.innerHTML = translatedHtml;
        }
    });

    const titleElement = document.querySelector('[data-i18n-document-title]');
    if(titleElement){
        const translatedTitle = getTranslation(titleElement.dataset.i18nDocumentTitle, selectedLanguage);
        if(translatedTitle !== null){
            document.title = translatedTitle;
        }
    }

    updateLanguageToggle(selectedLanguage);
    delete document.documentElement.dataset.languagePending;
}

function updateLanguageToggle(language){
    const selectedLanguage = normalizeLanguage(language);
    const languageToggle = document.getElementById('languageToggle');
    const languageToggleText = document.getElementById('languageToggleText');

    if(languageToggleText){
        languageToggleText.textContent = getTranslation('language.current', selectedLanguage);
    }

    if(languageToggle){
        const nextLanguageLabel = selectedLanguage == 'zh' ? 'language.toggleToEnglish' : 'language.toggleToChinese';
        languageToggle.setAttribute('aria-label', getTranslation(nextLanguageLabel, selectedLanguage));
    }
}

function toggleLanguage(){
    const nextLanguage = window.siteLanguage == 'zh' ? 'en' : 'zh';
    setStoredLanguage(nextLanguage);
    applyLanguage(nextLanguage);
}

function initLanguageToggle(){
    applyLanguage(getStoredLanguage());

    const languageToggle = document.getElementById('languageToggle');
    if(languageToggle){
        languageToggle.addEventListener('click', toggleLanguage);
    }
}

document.addEventListener('DOMContentLoaded', function(){
    headerElement = document.getElementById('header');

    if(getStoredValue('dark_mode') == 'true'){
        window.darkMode = true;
        showNight();
    } else {
        showDay();
    }
    initLanguageToggle();
    stickyHeaderFuncionality();
    applyMenuItemClasses();
    evaluateHeaderPosition();
    mobileMenuFunctionality();
    initProjectCardContextMenu();
});

// window.toggleDarkMode = function(){
//     document.documentElement.classList.toggle('dark');
//     if(document.documentElement.classList.contains('dark')){
//         localStorage.setItem('dark_mode', true);
//         window.darkMode = true;
//     } else {
//         window.darkMode = false;
//         localStorage.setItem('dark_mode', false);
//     }
// }




window.stickyHeaderFuncionality = function(){
    window.addEventListener('scroll', function() {
        evaluateHeaderPosition();
    });
}

window.evaluateHeaderPosition = function(){
    if(window.scrollY > 16){
        headerElement.firstElementChild.classList.add(...stickyClassesContainer);
        headerElement.firstElementChild.classList.remove(...unstickyClassesContainer);
        headerElement.classList.add(...stickyClasses);
        headerElement.classList.remove(...unstickyClasses);
        document.getElementById('menu').classList.add('top-[56px]');
        document.getElementById('menu').classList.remove('top-[75px]');

    } else {
        headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
        headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
        headerElement.classList.add(...unstickyClasses);
        headerElement.classList.remove(...stickyClasses);
        document.getElementById('menu').classList.remove('top-[56px]');
        document.getElementById('menu').classList.add('top-[75px]');
    }
}



document.getElementById('darkToggle').addEventListener('click', function(){
    document.documentElement.classList.add('duration-300');
    
    if(document.documentElement.classList.contains('dark')){
        localStorage.removeItem('dark_mode');
        showDay(true);
        
    } else {
        localStorage.setItem('dark_mode', true);
        showNight(true);
        
    }
});

function showDay(animate){
    document.getElementById('sun').classList.remove('setting');
    document.getElementById('moon').classList.remove('rising');
    
    let timeout = 0;
    

    if(animate){
        timeout = 500;
        
        document.getElementById('moon').classList.add('setting');
    }

    setTimeout(function(){
        document.getElementById('dayText').classList.remove('hidden');
        document.getElementById('nightText').classList.add('hidden');

        document.getElementById('moon').classList.add('hidden');
        document.getElementById('sun').classList.remove('hidden');

        if(animate){
            document.documentElement.classList.remove('dark');
            document.getElementById('sun').classList.add('rising');
        }
        
    }, timeout);
}

function showNight(animate){
    document.getElementById('moon').classList.remove('setting');
    document.getElementById('sun').classList.remove('rising');

    let timeout = 0;
    

    if(animate){
        timeout = 500;
        
        document.getElementById('sun').classList.add('setting');
    }

    setTimeout(function(){
        document.getElementById('nightText').classList.remove('hidden');
        document.getElementById('dayText').classList.add('hidden');

        document.getElementById('sun').classList.add('hidden');
        document.getElementById('moon').classList.remove('hidden');

        if(animate){
            document.documentElement.classList.add('dark');
            document.getElementById('moon').classList.add('rising');
        }

    }, timeout);
}

window.applyMenuItemClasses = function(){
    const menuItems = document.querySelectorAll('#menu a');
    console.log(menuItems);
    for(let i = 0; i < menuItems.length; i++){
        if(menuItems[i].pathname == window.location.pathname){
            menuItems[i].classList.add('text-neutral-900', 'dark:text-white');
        }
    }
    //:class="{ 'text-neutral-900 dark:text-white': window.location.pathname == '{menu.url}', 'text-neutral-700 dark:text-neutral-400': window.location.pathname != '{menu.url}' }"
}


function mobileMenuFunctionality(){
    document.getElementById('openMenu').addEventListener('click', function(){
        openMobileMenu();
    });

    document.getElementById('closeMenu').addEventListener('click', function(){
        closeMobileMenu();
    });
}

window.openMobileMenu = function(){
    document.getElementById('openMenu').classList.add('hidden');
    document.getElementById('closeMenu').classList.remove('hidden');
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('mobileMenuBackground').classList.add('opacity-0');
    document.getElementById('mobileMenuBackground').classList.remove('hidden');

    setTimeout(function(){
        document.getElementById('mobileMenuBackground').classList.remove('opacity-0');
    }, 1);
}

window.closeMobileMenu = function(){
    document.getElementById('closeMenu').classList.add('hidden');
    document.getElementById('openMenu').classList.remove('hidden');
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('mobileMenuBackground').classList.add('hidden');
}

function initProjectCardContextMenu(){
    const cards = document.querySelectorAll('[data-email]');
    if(!cards.length){
        return;
    }

    const menu = document.createElement('div');
    menu.id = 'projectCardContextMenu';
    menu.className = 'fixed z-50 hidden min-w-32 overflow-hidden rounded-md border border-neutral-200 bg-white py-1 text-sm shadow-lg dark:border-neutral-700 dark:bg-neutral-900';
    document.body.appendChild(menu);

    cards.forEach(function(card){
        card.addEventListener('contextmenu', function(event){
            event.preventDefault();
            showProjectCardContextMenu(event, card, menu);
        });
    });

    document.addEventListener('click', function(){
        hideProjectCardContextMenu(menu);
    });

    document.addEventListener('keydown', function(event){
        if(event.key === 'Escape'){
            hideProjectCardContextMenu(menu);
        }
    });

    window.addEventListener('scroll', function(){
        hideProjectCardContextMenu(menu);
    }, { passive: true });
}

function showProjectCardContextMenu(event, card, menu){
    const email = card.dataset.email;
    const profileUrl = card.dataset.profileUrl || card.getAttribute('href');
    const hasHomepage = isHomepageUrl(profileUrl);
    const items = [
        {
            label: getTranslation('context.copyEmail'),
            action: function(){
                copyTextToClipboard(email);
            }
        }
    ];

    if(hasHomepage){
        items.push({
            label: getTranslation('context.visitHomepage'),
            action: function(){
                window.location.href = profileUrl;
            }
        });
    }

    menu.innerHTML = '';
    items.forEach(function(item){
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'block w-full px-4 py-2 text-left text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800';
        button.textContent = item.label;
        button.addEventListener('click', function(){
            item.action();
            hideProjectCardContextMenu(menu);
        });
        menu.appendChild(button);
    });

    menu.classList.remove('hidden');
    const menuRect = menu.getBoundingClientRect();
    const x = Math.min(event.clientX, window.innerWidth - menuRect.width - 8);
    const y = Math.min(event.clientY, window.innerHeight - menuRect.height - 8);
    menu.style.left = Math.max(8, x) + 'px';
    menu.style.top = Math.max(8, y) + 'px';
}

function hideProjectCardContextMenu(menu){
    if(menu){
        menu.classList.add('hidden');
    }
}

function isHomepageUrl(url){
    if(!url){
        return false;
    }

    return !url.startsWith('mailto:') && !url.startsWith('javascript:');
}

function copyTextToClipboard(text){
    if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text);
        return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
}
