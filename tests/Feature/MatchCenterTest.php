<?php

test('match center page is available to the public', function () {
    $response = $this->get(route('match-center'));

    $response->assertOk();
});
