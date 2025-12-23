import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import Button from '../../components/common/Button/Button';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <div className={styles.homePage}>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleGradient}>DevPortfolio</span> — твоё цифровое резюме
              </h1>
              <p className={styles.heroSubtitle}>
                Создавай впечатляющее IT-портфолио, делись проектами и находи единомышленников
              </p>
              <p className={styles.heroDescription}>
                Современная платформа для презентации ваших навыков и проектов. 
                Покажите свои работы в лучшем свете, привлекайте внимание работодателей 
                и вдохновляйтесь работами других разработчиков.
              </p>
              
              <div className={styles.heroButtons}>
                {isAuthenticated ? (
                  <>
                    <div className={styles.userWelcome}>
                      <span className={styles.welcomeText}>Добро пожаловать, {user?.name}!</span>
                    </div>
                    <div className={styles.buttonsGroup}>
                      <Link to="/projects/add">
                        <Button variant="primary" size="large" className={styles.heroButton}>
                          ➕ Добавить проект
                        </Button>
                      </Link>
                      <Link to="/profiles">
                        <Button variant="outline" size="large" className={styles.heroButton}>
                          👥 Публичные портфолио
                        </Button>
                      </Link>
                      <Link to="/projects">
                        <Button variant="outline" size="large" className={styles.heroButton}>
                          📁 Мои проекты
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.buttonsGroup}>
                      <Link to="/register">
                        <Button variant="primary" size="large" className={styles.heroButton}>
                          🚀 Начать бесплатно
                        </Button>
                      </Link>
                      <Link to="/profiles">
                        <Button variant="outline" size="large" className={styles.heroButton}>
                          👀 Посмотреть примеры
                        </Button>
                      </Link>
                    </div>
                    <p className={styles.loginHint}>
                      Уже есть аккаунт? <Link to="/login" className={styles.loginLink}>Войти</Link>
                    </p>
                  </>
                )}
              </div>
            </div>
            
            <div className={styles.heroVisual}>
              <div className={styles.heroImage}>
                <div className={styles.imageContainer}>
                  <div className={styles.codeWindow}>
                    <div className={styles.windowHeader}>
                      <div className={styles.windowButtons}>
                        <span className={styles.windowButton} style={{ backgroundColor: '#ff5f56' }}></span>
                        <span className={styles.windowButton} style={{ backgroundColor: '#ffbd2e' }}></span>
                        <span className={styles.windowButton} style={{ backgroundColor: '#27c93f' }}></span>
                      </div>
                      <div className={styles.windowTitle}>portfolio.js</div>
                    </div>
                    <div className={styles.codeContent}>
                      <pre className={styles.code}>
                        {`const developer = {
                          name: "${user?.name || 'Ваше имя'}",
                          role: "Full-stack разработчик",
                          skills: ["React", "TypeScript", "Node.js"],
                          projects: ${user ? '5' : 'Ваши проекты'},
                          motto: "Создаю будущее кодом"
                        };

                        export default developer;`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Почему выбирают DevPortfolio?</h2>
            <p className={styles.sectionSubtitle}>
              Всё, что нужно для создания впечатляющего портфолио
            </p>
          </div>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎨</div>
              <h3 className={styles.featureTitle}>Визуальная привлекательность</h3>
              <p className={styles.featureDescription}>
                Показывайте проекты через красивые карточки с изображениями. 
                Настраивайте оформление под свой стиль.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Мгновенное обновление</h3>
              <p className={styles.featureDescription}>
                Добавляйте новые проекты без перепубликации резюме. 
                Ваше портфолио всегда актуально.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3 className={styles.featureTitle}>Адаптивный дизайн</h3>
              <p className={styles.featureDescription}>
                Идеальное отображение на любом устройстве — от смартфона до десктопа.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Как это работает</h2>
            <p className={styles.sectionSubtitle}>
              3 простых шага к вашему идеальному портфолио
            </p>
          </div>
          
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Создайте аккаунт</h3>
              <p className={styles.stepDescription}>
                Зарегистрируйтесь за 2 минуты. Это бесплатно и не требует подтверждения email.
              </p>
            </div>
            
            <div className={styles.stepArrow}>→</div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Добавьте проекты</h3>
              <p className={styles.stepDescription}>
                Заполните информацию о ваших работах: описание, технологии, ссылки на код и демо.
              </p>
            </div>
            
            <div className={styles.stepArrow}>→</div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Поделитесь ссылкой</h3>
              <p className={styles.stepDescription}>
                Отправьте ссылку на ваше портфолио работодателям или добавьте в резюме.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
