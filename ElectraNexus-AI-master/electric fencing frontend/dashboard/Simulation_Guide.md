# FenceGuard.ai Simulation Page Guide

The **Simulation** page visually demonstrates how the FenceGuard.ai system responds to various physical events along the perimeter. 

Because the dashboard does not always have active physical hardware connected for demonstrations, this documentation outlines the predefined simulation sequences available to mimic real-world system behaviors.

## Overview
The Simulation sequence consists of hardware-triggered scenarios processed in real-time. For any given scenario, the response sequence goes through three distinct phases:

1. **Sensor Telemetry (Phase 1)**: RCM sensors register changes in voltage and noise levels.
2. **LSTM Classification (Phase 2)**: The AI Engine evaluates the telemetry data using deep learning to classify the anomaly.
3. **Hardware Response (Phase 3)**: Action signals are dispatched to smart relays, or alerts are sent out depending on severity.

---

## 1. Simulate Normal (Baseline Operation)
Clicking the `Simulate Normal` button simulates default, ambient conditions.

- **Sensor Telemetry**: 
   - Voltage Drop: `0.0%`
   - Residual Noise: `Low`
- **LSTM Classification**: 
   - The LSTM AI correctly classifies the telemetry as **Baseline background noise**. No action is taken by the AI algorithm.
- **Hardware Response**: 
   - Smart Relays remain **Closed**.
   - The electric fence remains completely **Live**.

---

## 2. Simulate Theft (Intruder Tapping)
When an intruder bypasses standard alert metrics by gradually reducing the lines or tapping in, the system registers complex frequency variations. 

- **Sensor Telemetry**: 
   - Voltage Drop: `5.2%` (a minor drop that traditional systems ignore).
   - Residual Noise: **Spiking** (due to the introduction of human interference or minor loads).
- **LSTM Classification**: 
   - **Anomaly Detected**. The pattern matches historical data for unauthorized tapping (Theft).
- **Hardware Response**: 
   - **Smart Relays**: Remain closed (keeps shock deterrent active on perpetrators).
   - **Alert**: A high-priority Security Alert is dispatched to physical security teams with the exact location computed by TDR.

---

## 3. Simulate Fault (Short to Ground)
Accidental short-circuits (e.g., from an animal touching both lines or a heavy wet branch falling on the line) create significant and immediate signal deviations.

- **Sensor Telemetry**: 
   - Voltage Drop: **88.9%** (A significant power anomaly).
   - Residual Noise: **Spiking** (Harmonic interference immediately spikes).
- **LSTM Classification**: 
   - **Anomaly Detected**. Pattern uniquely identified as a continuous hard ground (Animal/Object Fault).
- **Hardware Response**: 
   - **Smart Relays**: Immediately **Tripped** (Circuit Open) on the affected isolating segment only.
   - **Safety First**: Prevents continuous lethal currents on trapped animals or safe humans.
   - **Alert**: Dispatches a Security Alert to the operator to check the physical segment.

---

By utilizing the Simulation page, facility managers, prospects, or administrative personnel can rapidly understand how FenceGuard.ai distinguishes between harmless environmental noise, insidious human sabotage, and physical maintenance faults.
