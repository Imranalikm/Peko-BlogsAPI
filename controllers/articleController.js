import Article from '../models/Article.js';

export const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;

    const existingArticle = await Article.findOne({ title });
    if (existingArticle) {
      return res.status(400).json({ error: 'An article with this title already exists.' });
    }

    const article = new Article({ title, content, author: req.user._id });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'username');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'username');
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    article.title = title;
    article.content = content;
    await article.save();
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await Article.deleteOne({ _id: req.params.id });
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
