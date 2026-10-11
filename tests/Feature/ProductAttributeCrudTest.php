<?php

use App\Models\ProductAttribute;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests cannot access product attributes', function () {
    $this->get(route('attributes.index'))
        ->assertRedirect(route('login'));
});

test('index lists product attributes and their values', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);
    $attribute->values()->create(['value' => 'Red']);

    $this->actingAs(User::factory()->admin()->create())
        ->get(route('attributes.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('attributes/index')
            ->has('attributes', 1)
            ->where('attributes.0.values.0.value', 'Red'));
});

test('create page renders the product attribute form', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->get(route('attributes.create'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('attributes/create'));
});

test('edit page renders the selected product attribute', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->get(route('attributes.edit', $attribute))
        ->assertInertia(fn (Assert $page) => $page
            ->component('attributes/edit')
            ->where('attribute.id', $attribute->id)
            ->where('attribute.name', 'Color'));
});

test('a product attribute can be created with a generated slug', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post(route('attributes.store'), [
            'name' => 'Sleeve Length',
            'slug' => '',
        ])
        ->assertRedirect(route('attributes.index'));

    $this->assertDatabaseHas('product_attributes', [
        'name' => 'Sleeve Length',
        'slug' => 'sleeve-length',
    ]);
});

test('creating a product attribute requires a name and slug source', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post(route('attributes.store'), [])
        ->assertSessionHasErrors(['name', 'slug']);
});

test('creating a product attribute rejects duplicate names and slugs', function () {
    ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('attributes.store'), [
            'name' => 'Color',
            'slug' => 'color',
        ])
        ->assertSessionHasErrors(['name', 'slug']);
});

test('a product attribute can be updated without changing its unique values', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('attributes.update', $attribute), [
            'name' => 'Colour',
            'slug' => 'colour',
        ])
        ->assertRedirect(route('attributes.index'));

    $this->assertDatabaseHas('product_attributes', [
        'id' => $attribute->id,
        'name' => 'Colour',
        'slug' => 'colour',
    ]);
});

test('updating a product attribute rejects another attributes unique values', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);
    ProductAttribute::create([
        'name' => 'Size',
        'slug' => 'size',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('attributes.update', $attribute), [
            'name' => 'Size',
            'slug' => 'size',
        ])
        ->assertSessionHasErrors(['name', 'slug']);
});

test('show redirects to the product attribute edit page', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->get(route('attributes.show', $attribute))
        ->assertRedirect(route('attributes.edit', $attribute));
});

test('a product attribute can be deleted with its configured values', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);
    $value = $attribute->values()->create(['value' => 'Red']);

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('attributes.destroy', $attribute))
        ->assertRedirect(route('attributes.index'));

    $this->assertDatabaseMissing('product_attributes', ['id' => $attribute->id]);
    $this->assertDatabaseMissing('product_attribute_values', ['id' => $value->id]);
});

test('a product attribute value can be created from the attributes page', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('attributes.values.store', $attribute), [
            'value' => 'Red',
        ])
        ->assertRedirect(route('attributes.index'));

    $this->assertDatabaseHas('product_attribute_values', [
        'attribute_id' => $attribute->id,
        'value' => 'Red',
    ]);
});

test('a product attribute value is unique within its attribute', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);
    $attribute->values()->create(['value' => 'Red']);
    $otherAttribute = ProductAttribute::create([
        'name' => 'Lining',
        'slug' => 'lining',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('attributes.values.store', $attribute), [
            'value' => 'Red',
        ])
        ->assertSessionHasErrors('value');

    $this->post(route('attributes.values.store', $otherAttribute), [
        'value' => 'Red',
    ])->assertRedirect(route('attributes.index'));

    $this->assertDatabaseHas('product_attribute_values', [
        'attribute_id' => $otherAttribute->id,
        'value' => 'Red',
    ]);
});

test('a product attribute value requires a nonempty string', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('attributes.values.store', $attribute), [
            'value' => '',
        ])
        ->assertSessionHasErrors('value');
});

test('a product attribute value can be updated without conflicting with itself', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);
    $value = $attribute->values()->create(['value' => 'Red']);

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('attributes.values.update', [$attribute, $value]), [
            'value' => 'Crimson',
        ])
        ->assertRedirect(route('attributes.index'));

    $this->assertDatabaseHas('product_attribute_values', [
        'id' => $value->id,
        'attribute_id' => $attribute->id,
        'value' => 'Crimson',
    ]);
});

test('a product attribute value cannot be updated to another value of the same attribute', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);
    $value = $attribute->values()->create(['value' => 'Red']);
    $attribute->values()->create(['value' => 'Blue']);

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('attributes.values.update', [$attribute, $value]), [
            'value' => 'Blue',
        ])
        ->assertSessionHasErrors('value');

    $this->assertDatabaseHas('product_attribute_values', [
        'id' => $value->id,
        'value' => 'Red',
    ]);
});

test('a product attribute value cannot be updated through another attribute', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);
    $otherAttribute = ProductAttribute::create([
        'name' => 'Size',
        'slug' => 'size',
    ]);
    $value = $attribute->values()->create(['value' => 'Red']);

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('attributes.values.update', [$otherAttribute, $value]), [
            'value' => 'Large',
        ])
        ->assertNotFound();

    $this->assertDatabaseHas('product_attribute_values', [
        'id' => $value->id,
        'attribute_id' => $attribute->id,
        'value' => 'Red',
    ]);
});

test('a product attribute value can be deleted from its attribute', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);
    $value = $attribute->values()->create(['value' => 'Red']);

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('attributes.values.destroy', [$attribute, $value]))
        ->assertRedirect(route('attributes.index'));

    $this->assertDatabaseMissing('product_attribute_values', ['id' => $value->id]);
});

test('a product attribute value cannot be deleted through another attribute', function () {
    $attribute = ProductAttribute::create([
        'name' => 'Color',
        'slug' => 'color',
    ]);
    $otherAttribute = ProductAttribute::create([
        'name' => 'Size',
        'slug' => 'size',
    ]);
    $value = $attribute->values()->create(['value' => 'Red']);

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('attributes.values.destroy', [$otherAttribute, $value]))
        ->assertNotFound();

    $this->assertDatabaseHas('product_attribute_values', [
        'id' => $value->id,
        'attribute_id' => $attribute->id,
    ]);
});
