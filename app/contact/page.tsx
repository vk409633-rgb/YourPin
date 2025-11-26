'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './contact.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset status after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Header />
            <main className={styles.contactPage}>
                <div className="container">
                    <div className={styles.content}>
                        <header className={styles.header}>
                            <h1>Contact Us</h1>
                            <p className={styles.subtitle}>
                                Have a question or feedback? We'd love to hear from you!
                            </p>
                        </header>

                        <div className={styles.contactGrid}>
                            {/* Contact Form */}
                            <div className={styles.formSection}>
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className="input-group">
                                        <label htmlFor="name" className="input-label">
                                            Your Name *
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="input-field"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label htmlFor="email" className="input-label">
                                            Email Address *
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="input-field"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label htmlFor="subject" className="input-label">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            className="input-field"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="support">Technical Support</option>
                                            <option value="feature">Feature Request</option>
                                            <option value="bug">Bug Report</option>
                                            <option value="business">Business Inquiry</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="input-group">
                                        <label htmlFor="message" className="input-label">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className={styles.textarea}
                                            placeholder="Tell us how we can help you..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={6}
                                            required
                                        />
                                    </div>

                                    {status === 'success' && (
                                        <div className={styles.success}>
                                            <span className={styles.successIcon}>✓</span>
                                            Thank you! Your message has been sent successfully. We'll get back to you soon.
                                        </div>
                                    )}

                                    {status === 'error' && (
                                        <div className={styles.error}>
                                            <span className={styles.errorIcon}>⚠️</span>
                                            Oops! Something went wrong. Please try again later.
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={status === 'sending'}
                                        style={{ width: '100%' }}
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <span className="spinner"></span>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <span>📧</span>
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Contact Information */}
                            <div className={styles.infoSection}>
                                <div className={styles.infoCard}>
                                    <h2>Get in Touch</h2>
                                    <p>
                                        We're here to help! Whether you have a question about features, need technical support,
                                        or just want to give feedback, our team is ready to answer all your questions.
                                    </p>
                                </div>

                                <div className={styles.infoCard}>
                                    <h3>📧 Email</h3>
                                    <p>
                                        <a href="mailto:vk409633@gmail.com">vk409633@gmail.com</a>
                                    </p>
                                    <p className={styles.infoDetail}>
                                        We typically respond within 24 hours
                                    </p>
                                </div>

                                <div className={styles.infoCard}>
                                    <h3>💬 Response Time</h3>
                                    <p>
                                        <strong>Monday - Friday:</strong> 9 AM - 6 PM (EST)<br />
                                        <strong>Weekend:</strong> Limited support
                                    </p>
                                </div>

                                <div className={styles.infoCard}>
                                    <h3>🔗 Quick Links</h3>
                                    <ul className={styles.quickLinks}>
                                        <li><a href="/about">About Us</a></li>
                                        <li><a href="/privacy">Privacy Policy</a></li>
                                        <li><a href="/#pinterest">Pinterest Downloader</a></li>
                                        <li><a href="/#youtube">YouTube Downloader</a></li>
                                    </ul>
                                </div>

                                <div className={styles.infoCard}>
                                    <h3>❓ FAQ</h3>
                                    <div className={styles.faq}>
                                        <details>
                                            <summary>Is YourPin really free?</summary>
                                            <p>Yes! Our basic features are completely free. Pro features can be unlocked by watching a short ad.</p>
                                        </details>
                                        <details>
                                            <summary>Do you store my data?</summary>
                                            <p>No, we don't store any of your personal data or download history. Your privacy is our priority.</p>
                                        </details>
                                        <details>
                                            <summary>What formats are supported?</summary>
                                            <p>We support all Pinterest video formats and YouTube thumbnail formats in multiple qualities.</p>
                                        </details>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
