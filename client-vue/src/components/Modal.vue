<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div class="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <div class="flex justify-between items-center pb-4 border-b border-gray-200">
          <slot name="closeModalButton"></slot>
        </div>
        <slot name="form"></slot>
      </div>
    </div>
</template>