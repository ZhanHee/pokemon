const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon');

// 获取所有宝可梦
router.get('/', async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.json(pokemons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 获取单个宝可梦
router.get('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id);
        if (!pokemon) return res.status(404).json({ message: 'Pokemon not found' });
        res.json(pokemon);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 添加新的宝可梦
router.post('/', async (req, res) => {
    try {
        const newPokemon = new Pokemon(req.body);
        const savedPokemon = await newPokemon.save();
        res.status(201).json(savedPokemon);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 更新宝可梦
router.put('/:id', async (req, res) => {
    try {
        const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPokemon) return res.status(404).json({ message: 'Pokemon not found' });
        res.json(updatedPokemon);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 删除宝可梦
router.delete('/:id', async (req, res) => {
    try {
        const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);
        if (!deletedPokemon) return res.status(404).json({ message: 'Pokemon not found' });
        res.json({ message: 'Pokemon deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;