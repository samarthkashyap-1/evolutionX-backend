import { createPokemon, getPokemons, feedPokemon, evolvePokemon, allPokemons, disownPokemon, getHealth } from "../controllers/pokemonControllers";
import { Router } from "express";
import { protect } from "../utils/auth";

const router = Router();

router.get("/", protect, getPokemons);
router.post("/create", protect, createPokemon);
router.put("/feed", protect, feedPokemon);
router.put("/evolve", protect, evolvePokemon);
router.get("/all", allPokemons);
router.delete("/disown/:id", protect, disownPokemon);
router.get("/:id/health", protect, getHealth);


export default router;